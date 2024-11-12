import yfinance as yf
from datetime import datetime, timedelta

class NewsFetcher:
    def __init__(self):
        pass

    def get_news(self, symbol, limit=10):
        try:
            ticker = yf.Ticker(symbol)
            news = ticker.news
            
            categorized_news = []
            for item in news[:limit]:
                category = self.categorize_news(item['title'] + ' ' + item['summary'])
                categorized_news.append({
                    'title': item['title'],
                    'summary': item['summary'],
                    'providerPublishTime': datetime.fromtimestamp(item['providerPublishTime']),
                    'category': category
                })
            
            return categorized_news
        except Exception as e:
            print(f"Error fetching news for {symbol}: {str(e)}")
            return []

    def categorize_news(self, text):
        text = text.lower()
        categories = {
            'earnings': ['earnings', 'revenue', 'profit', 'loss', 'financial results', 'quarterly'],
            'product': ['launch', 'release', 'new product', 'innovation', 'unveil'],
            'management': ['ceo', 'executive', 'appoint', 'resign', 'board of directors'],
            'market': ['market share', 'competition', 'industry', 'sector', 'trend'],
            'legal': ['lawsuit', 'legal', 'court', 'patent', 'regulatory'],
            'partnership': ['partnership', 'collaboration', 'joint venture', 'alliance']
        }

        for category, keywords in categories.items():
            if any(keyword in text for keyword in keywords):
                return category
        return 'other'
