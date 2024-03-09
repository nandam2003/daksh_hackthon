import re
from django.shortcuts import render
import nltk
from . import ml_models as ml
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import pickle

# nltk.download("stopwords")
# nltk.download("punkt")
# nltk.download("wordnet")
# nltk.download("vader_lexicon")

# Create your views here.


def home(request):

    if request.method == "POST":
        print('POST')
        author = request.POST["author"]
        msg = request.POST["message"]

        # Preprocessing
        clean_msg = re.sub(r"[^a-zA-Z0-9/s]", " ", msg)

        # Tokenization
        tokens = nltk.word_tokenize(clean_msg)
        # Lowercasing
        tokens = [word.lower() for word in tokens]
        # Removing stop words
        stop_words = set(nltk.corpus.stopwords.words("english"))
        tokens = [word for word in tokens if word not in stop_words]
        # Lemmatization
        lemmatizer = nltk.stem.WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens]

        sid = SentimentIntensityAnalyzer()
        sentiment_scores = sid.polarity_scores(msg)

        tone = ""
        # Classify the sentiment based on the compound score
        if sentiment_scores["compound"] >= 0.05:
            tone = "Positive"
        elif sentiment_scores["compound"] <= -0.05:
            tone = "Negative"
        else:
            tone = "Neutral"
        
        loaded_model = None
        with open('model.pkl', 'rb') as f:
            loaded_model = pickle.load(f)
        
        result = loaded_model.predict([' '.join(tokens)])[0]
        if result == 0:
            print('REAL')
        else:
            print('FAKE')
    
        return render(
            request,
            "AppTemplates/home.html",
            {"author": author, "tone": tone},
        )

    return render(request, "AppTemplates/home.html", {"tone": ""})
