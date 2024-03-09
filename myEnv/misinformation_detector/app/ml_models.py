import nltk
import torch
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import VotingClassifier
from transformers import BertTokenizer, BertForSequenceClassification
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.feature_extraction.text import TfidfVectorizer
from transformers import pipeline


nltk.download("stopwords")


def preprocessing(msg):
    # Tokenization
    tokens = nltk.word_tokenize(msg)
    # Lowercasing
    tokens = [word.lower() for word in tokens]
    # Removing stop words
    stop_words = set(nltk.corpus.stopwords.words("english"))
    tokens = [word for word in tokens if word not in stop_words]
    # Lemmatization
    lemmatizer = nltk.stem.WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(word) for word in tokens]
    return tokens



def hybrid_model(msg):

    # Logistic Regression with TF-IDF
    logistic_regression_model = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', LogisticRegression())
    ])

    # Support Vector Machine with TF-IDF
    svm_model = Pipeline([
        ('tfidf', TfidfVectorizer()),
        ('clf', SVC(probability=True))
    ])

    # Load pre-trained BERT model and tokenizer
    bert_model_name = "bert-base-uncased"
    bert_tokenizer = BertTokenizer.from_pretrained(bert_model_name)
    bert_model = BertForSequenceClassification.from_pretrained(bert_model_name)

    # BERT model for sequence classification
    bert_classifier = pipeline('sentiment-analysis', model=bert_model, tokenizer=bert_tokenizer, device=0 if torch.cuda.is_available() else -1)

    # LSTM model for sequence classification
    max_words = 1000  # Maximum number of words to consider as features
    max_sequence_length = 50  # Maximum length of sequences
    lstm_model = Sequential([
        Embedding(max_words, 64, input_length=max_sequence_length),
        LSTM(64),
        Dense(1, activation='sigmoid')
    ])
    lstm_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Hybrid Model Architecture - Voting Classifier
    voting_classifier = VotingClassifier(estimators=[
        ('lr', logistic_regression_model),
        ('svm', svm_model),
        ('bert', bert_classifier),
        ('lstm', lstm_model)
    ], voting='soft')  # 'soft' voting for probability-based averaging





    
