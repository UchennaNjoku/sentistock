from transformers import pipeline

class SentimentAnalyzer:
    def __init__(self):
        self.sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

    def analyze(self, text):
        result = self.sentiment_pipeline(text)[0]
        sentiment = result['label'].lower()
        score = result['score']
        
        return {
            'sentiment': sentiment,
            'scores': {
                'positive': score if sentiment == 'positive' else 1 - score,
                'negative': score if sentiment == 'negative' else 1 - score
            }
        }

    def analyze_news(self, news_list):
        results = []
        for news_item in news_list:
            title_sentiment = self.analyze(news_item['title'])
            summary_sentiment = self.analyze(news_item['summary'])
            results.append({
                'title': news_item['title'],
                'summary': news_item['summary'],
                'providerPublishTime': news_item['providerPublishTime'],
                'category': news_item['category'],
                'title_sentiment': title_sentiment,
                'summary_sentiment': summary_sentiment
            })
        return results
