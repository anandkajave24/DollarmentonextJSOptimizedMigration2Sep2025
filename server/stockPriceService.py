#!/usr/bin/env python3
"""
Stock Price Service using yfinance
Provides real-time stock price data for Indian stocks
"""

import yfinance as yf
import json
import sys
import logging
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class StockPriceService:
    """Service for fetching Indian and global stock prices using yfinance"""
    
    def __init__(self):
        self.nse_suffix = ".NS"
        self.bse_suffix = ".BO"
        self.us_exchanges = ["NASDAQ", "NYSE", "AMEX"]
        
        # Removed Indian stocks to maintain USA focus
        
        # Popular US stocks
        self.us_stocks = {
            "AAPL": "Apple Inc.",
            "MSFT": "Microsoft Corporation",
            "GOOGL": "Alphabet Inc.",
            "AMZN": "Amazon.com Inc.",
            "NVDA": "NVIDIA Corporation",
            "META": "Meta Platforms Inc.",
            "TSLA": "Tesla Inc.",
            "NFLX": "Netflix Inc.",
            "ORCL": "Oracle Corporation",
            "CRM": "Salesforce Inc.",
            "ADBE": "Adobe Inc.",
            "PYPL": "PayPal Holdings Inc.",
            "INTC": "Intel Corporation",
            "AMD": "Advanced Micro Devices",
            "QCOM": "Qualcomm Incorporated",
            "UBER": "Uber Technologies Inc.",
            "ZOOM": "Zoom Video Communications",
            "SPOT": "Spotify Technology S.A.",
            "SQ": "Block Inc.",
            "SHOP": "Shopify Inc."
        }
        
        # USA ETFs (Exchange Traded Funds) - Focus on major US ETFs only
        self.us_etfs = {
            "SPY": "SPDR S&P 500 ETF Trust",
            "QQQ": "Invesco QQQ Trust",
            "VTI": "Vanguard Total Stock Market ETF",
            "IWM": "iShares Russell 2000 ETF",
            "GLD": "SPDR Gold Trust",
            "SLV": "iShares Silver Trust",
            "TLT": "iShares 20+ Year Treasury Bond ETF",
            "HYG": "iShares iBoxx $ High Yield Corporate Bond ETF",
            "EFA": "iShares MSCI EAFE ETF",
            "VEA": "Vanguard FTSE Developed Markets ETF"
        }
        
        # Commodities (Global)
        self.commodities = {
            "GC=F": "Gold Futures",
            "SI=F": "Silver Futures",
            "CL=F": "Crude Oil Futures",
            "NG=F": "Natural Gas Futures",
            "HG=F": "Copper Futures",
            "PL=F": "Platinum Futures",
            "PA=F": "Palladium Futures",
            "ZC=F": "Corn Futures",
            "ZW=F": "Wheat Futures",
            "ZS=F": "Soybean Futures",
            "CT=F": "Cotton Futures",
            "SB=F": "Sugar Futures",
            "KC=F": "Coffee Futures",
            "CC=F": "Cocoa Futures",
            "BZ=F": "Brent Crude Oil",
            "RB=F": "Gasoline Futures"
        }
        
        # Crypto currencies
        self.cryptocurrencies = {
            "BTC-USD": "Bitcoin",
            "ETH-USD": "Ethereum",
            "BNB-USD": "Binance Coin",
            "XRP-USD": "Ripple",
            "ADA-USD": "Cardano",
            "DOGE-USD": "Dogecoin",
            "SOL-USD": "Solana",
            "MATIC-USD": "Polygon",
            "DOT-USD": "Polkadot",
            "SHIB-USD": "Shiba Inu",
            "AVAX-USD": "Avalanche",
            "UNI-USD": "Uniswap",
            "LINK-USD": "Chainlink",
            "ALGO-USD": "Algorand",
            "VET-USD": "VeChain"
        }
        
        # Currency pairs - Focus on major USD pairs, remove INR references
        self.currency_pairs = {
            "EURUSD=X": "EUR/USD",
            "GBPUSD=X": "GBP/USD",
            "USDJPY=X": "USD/JPY",
            "AUDUSD=X": "AUD/USD",
            "USDCAD=X": "USD/CAD",
            "USDCHF=X": "USD/CHF",
            "NZDUSD=X": "NZD/USD",
            "USDMXN=X": "USD/MXN",
            "USDBRL=X": "USD/BRL",
            "USDKRW=X": "USD/KRW"
        }
        
        # Global indices
        self.global_indices = {
            "^GSPC": "S&P 500",
            "^DJI": "Dow Jones",
            "^IXIC": "NASDAQ",
            "^RUT": "Russell 2000",
            "^VIX": "VIX",
            "^FTSE": "FTSE 100",
            "^GDAXI": "DAX",
            "^FCHI": "CAC 40",
            "^N225": "Nikkei 225",
            "^HSI": "Hang Seng",
            "^AXJO": "ASX 200",
            "^BVSP": "Bovespa",
            "^MXX": "IPC Mexico",
            "^KS11": "KOSPI",
            "^TWII": "Taiwan Weighted",
            "^JKSE": "Jakarta Composite"
        }
    
    def get_stock_price(self, symbol: str, exchange: str = "US") -> Optional[Dict[str, Any]]:
        """
        Get current stock price for a given symbol (US markets only)
        
        Args:
            symbol: Stock symbol (e.g., "AAPL", "MSFT", "GOOGL")
            exchange: Exchange ("US", "NASDAQ", "NYSE")
        
        Returns:
            Dictionary with stock price data or None if not found
        """
        try:
            # Determine ticker symbol based on exchange and market
            if exchange in ["NSE", "BSE"]:
                # Indian market
                ticker_symbol = f"{symbol}{self.nse_suffix if exchange == 'NSE' else self.bse_suffix}"
                market = "INDIA"
                currency = "INR"
            else:
                # US market - no suffix needed
                ticker_symbol = symbol
                market = "USA"
                currency = "USD"
                exchange = "US"
            
            # Create ticker object
            ticker = yf.Ticker(ticker_symbol)
            
            # Get historical data for last 5 days to ensure we have previous close
            data = ticker.history(period="5d")
            
            if data.empty:
                logger.warning(f"No data found for {ticker_symbol}")
                return None
            
            # Get the last closing price
            last_close = float(data['Close'].iloc[-1])
            last_open = float(data['Open'].iloc[-1])
            last_high = float(data['High'].iloc[-1])
            last_low = float(data['Low'].iloc[-1])
            last_volume = int(data['Volume'].iloc[-1])
            
            # Get additional info
            info = ticker.info
            
            # Calculate technical indicators - use proper previous day close
            if len(data) > 1:
                prev_close = float(data['Close'].iloc[-2])  # Previous trading day close
            else:
                # Fallback: get more data to find previous close
                try:
                    extended_data = ticker.history(period="1mo")
                    if len(extended_data) > 1:
                        prev_close = float(extended_data['Close'].iloc[-2])
                    else:
                        prev_close = last_open  # Last resort fallback
                except:
                    prev_close = last_open
            
            change = round(last_close - prev_close, 2)
            change_percent = round((change / prev_close) * 100, 2) if prev_close > 0 else 0
            
            # Get company name
            company_name = info.get('longName', 'Unknown Company')
            if market == "INDIA" and symbol in self.indian_stocks:
                company_name = self.indian_stocks[symbol]
            elif market == "USA" and symbol in self.us_stocks:
                company_name = self.us_stocks[symbol]
            
            return {
                "symbol": symbol,
                "companyName": company_name,
                "exchange": exchange,
                "market": market,
                "currency": currency,
                "ticker": ticker_symbol,
                "lastPrice": round(last_close, 2),
                "openPrice": round(last_open, 2),
                "highPrice": round(last_high, 2),
                "lowPrice": round(last_low, 2),
                "volume": last_volume,
                "change": change,
                "changePercent": change_percent,
                "marketCap": info.get('marketCap', 0),
                "peRatio": info.get('forwardPE', 0),
                "bookValue": info.get('bookValue', 0),
                "dividendYield": info.get('dividendYield', 0) * 100 if info.get('dividendYield') else 0,
                "sector": info.get('sector', 'Unknown'),
                "industry": info.get('industry', 'Unknown'),
                "beta": info.get('beta', 1.0),
                "eps": info.get('trailingEps', 0),
                "52WeekHigh": info.get('fiftyTwoWeekHigh', 0),
                "52WeekLow": info.get('fiftyTwoWeekLow', 0),
                "avgVolume": info.get('averageVolume', 0),
                "timestamp": datetime.now().isoformat(),
                "dataSource": "yfinance"
            }
            
        except Exception as e:
            logger.error(f"Error fetching data for {symbol}: {str(e)}")
            return None
    
    def get_multiple_stocks(self, symbols: List[str], exchange: str = "NSE") -> Dict[str, Any]:
        """
        Get stock prices for multiple symbols
        
        Args:
            symbols: List of stock symbols
            exchange: Exchange ("NSE", "BSE", "US")
        
        Returns:
            Dictionary with stock data for each symbol
        """
        results = {}
        
        for symbol in symbols:
            stock_data = self.get_stock_price(symbol, exchange)
            if stock_data:
                results[symbol] = stock_data
            else:
                results[symbol] = {
                    "symbol": symbol,
                    "error": "Data not available",
                    "timestamp": datetime.now().isoformat()
                }
        
        return results
    
    def get_market_indices(self, market: str = "INDIA") -> Dict[str, Any]:
        """
        Get major market indices for India and US markets
        
        Args:
            market: Market type ("INDIA" or "USA")
        
        Returns:
            Dictionary with indices data
        """
        try:
            if market == "INDIA":
                indices = {
                    "NIFTY50": "^NSEI",
                    "SENSEX": "^BSESN",
                    "BANKNIFTY": "^NSEBANK",
                    "NIFTYIT": "^CNXIT",
                    "NIFTYFMCG": "^CNXFMCG"
                }
            else:  # USA
                indices = {
                    "SP500": "^GSPC",
                    "DOW": "^DJI",
                    "NASDAQ": "^IXIC",
                    "VIX": "^VIX",
                    "RUSSELL2000": "^RUT"
                }
            
            results = {}
            for index_name, ticker_symbol in indices.items():
                try:
                    ticker = yf.Ticker(ticker_symbol)
                    data = ticker.history(period="5d")
                    
                    if not data.empty:
                        last_close = float(data['Close'].iloc[-1])
                        last_open = float(data['Open'].iloc[-1])
                        # Ensure we get proper previous close for indices
                        if len(data) > 1:
                            prev_close = float(data['Close'].iloc[-2])
                        else:
                            # Get more data to find previous close
                            try:
                                extended_data = ticker.history(period="1mo")
                                prev_close = float(extended_data['Close'].iloc[-2]) if len(extended_data) > 1 else last_open
                            except:
                                prev_close = last_open
                        
                        results[index_name] = {
                            "name": index_name,
                            "ticker": ticker_symbol,
                            "lastPrice": round(last_close, 2),
                            "openPrice": round(last_open, 2),
                            "change": round(last_close - prev_close, 2),
                            "changePercent": round(((last_close - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0,
                            "market": market,
                            "timestamp": datetime.now().isoformat()
                        }
                    else:
                        results[index_name] = {
                            "name": index_name,
                            "error": "Data not available",
                            "timestamp": datetime.now().isoformat()
                        }
                except Exception as e:
                    results[index_name] = {
                        "name": index_name,
                        "error": f"Error: {str(e)}",
                        "timestamp": datetime.now().isoformat()
                    }
            
            return {
                "market": market,
                "indices": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching market indices for {market}: {str(e)}")
            return {
                "market": market,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_market_movers(self, market: str = "INDIA", mover_type: str = "gainers") -> Dict[str, Any]:
        """
        Get market movers (gainers/losers) for a specific market
        
        Args:
            market: Market type ("INDIA" or "USA")
            mover_type: Type of movers ("gainers" or "losers")
        
        Returns:
            Dictionary with top movers data
        """
        try:
            if market == "INDIA":
                # Top Indian stocks to check
                symbols = ["TCS", "RELIANCE", "INFY", "HDFCBANK", "ICICIBANK", 
                          "BHARTIARTL", "ITC", "HINDUNILVR", "MARUTI", "ASIANPAINT"]
                exchange = "NSE"
            else:  # USA
                # Top US stocks to check
                symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", 
                          "META", "TSLA", "NFLX", "ORCL", "CRM"]
                exchange = "US"
            
            # Get stock data
            stocks_data = self.get_multiple_stocks(symbols, exchange)
            
            # Filter valid stocks and sort by change percentage
            valid_stocks = []
            for symbol, data in stocks_data.items():
                if "error" not in data and data.get("changePercent") is not None:
                    valid_stocks.append(data)
            
            # Sort by change percentage
            if mover_type == "gainers":
                sorted_stocks = sorted(valid_stocks, key=lambda x: x["changePercent"], reverse=True)
            else:  # losers
                sorted_stocks = sorted(valid_stocks, key=lambda x: x["changePercent"])
            
            return {
                "market": market,
                "type": mover_type,
                "stocks": sorted_stocks[:10],  # Top 10
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching market movers for {market}: {str(e)}")
            return {
                "market": market,
                "type": mover_type,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_etf_data(self, market: str = "INDIA") -> Dict[str, Any]:
        """
        Get ETF (Exchange Traded Fund) data
        
        Args:
            market: Market type ("INDIA" or "USA")
        
        Returns:
            Dictionary with ETF data
        """
        try:
            if market == "INDIA":
                etfs = self.indian_etfs
            else:
                # Popular US ETFs
                etfs = {
                    "SPY": "SPDR S&P 500 ETF",
                    "QQQ": "Invesco QQQ ETF",
                    "IWM": "iShares Russell 2000 ETF",
                    "EFA": "iShares MSCI EAFE ETF",
                    "EEM": "iShares MSCI Emerging Markets ETF",
                    "VTI": "Vanguard Total Stock Market ETF",
                    "GLD": "SPDR Gold Trust",
                    "SLV": "iShares Silver Trust",
                    "TLT": "iShares 20+ Year Treasury Bond ETF",
                    "HYG": "iShares iBoxx $ High Yield Corporate Bond ETF"
                }
            
            results = {}
            for symbol, name in etfs.items():
                try:
                    ticker_symbol = f"{symbol}.NS" if market == "INDIA" else symbol
                    stock_data = self.get_stock_price(symbol, "NSE" if market == "INDIA" else "US")
                    if stock_data and "error" not in stock_data:
                        results[symbol] = {
                            **stock_data,
                            "name": name,
                            "type": "ETF"
                        }
                except Exception as e:
                    logger.error(f"Error fetching ETF {symbol}: {str(e)}")
                    continue
            
            return {
                "market": market,
                "etfs": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching ETF data for {market}: {str(e)}")
            return {
                "market": market,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_commodity_data(self) -> Dict[str, Any]:
        """
        Get commodity futures data
        
        Returns:
            Dictionary with commodity data
        """
        try:
            results = {}
            for symbol, name in self.commodities.items():
                try:
                    ticker = yf.Ticker(symbol)
                    data = ticker.history(period="1d")
                    
                    if not data.empty:
                        last_close = float(data['Close'].iloc[-1])
                        last_open = float(data['Open'].iloc[-1])
                        prev_close = float(data['Close'].iloc[-2]) if len(data) > 1 else last_open
                        
                        results[symbol] = {
                            "symbol": symbol,
                            "name": name,
                            "lastPrice": round(last_close, 2),
                            "openPrice": round(last_open, 2),
                            "change": round(last_close - prev_close, 2),
                            "changePercent": round(((last_close - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0,
                            "type": "Commodity",
                            "timestamp": datetime.now().isoformat()
                        }
                except Exception as e:
                    logger.error(f"Error fetching commodity {symbol}: {str(e)}")
                    continue
            
            return {
                "commodities": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching commodity data: {str(e)}")
            return {
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_cryptocurrency_data(self) -> Dict[str, Any]:
        """
        Get cryptocurrency data
        
        Returns:
            Dictionary with cryptocurrency data
        """
        try:
            results = {}
            for symbol, name in self.cryptocurrencies.items():
                try:
                    ticker = yf.Ticker(symbol)
                    data = ticker.history(period="1d")
                    
                    if not data.empty:
                        last_close = float(data['Close'].iloc[-1])
                        last_open = float(data['Open'].iloc[-1])
                        prev_close = float(data['Close'].iloc[-2]) if len(data) > 1 else last_open
                        
                        results[symbol] = {
                            "symbol": symbol,
                            "name": name,
                            "lastPrice": round(last_close, 2),
                            "openPrice": round(last_open, 2),
                            "change": round(last_close - prev_close, 2),
                            "changePercent": round(((last_close - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0,
                            "type": "Cryptocurrency",
                            "timestamp": datetime.now().isoformat()
                        }
                except Exception as e:
                    logger.error(f"Error fetching cryptocurrency {symbol}: {str(e)}")
                    continue
            
            return {
                "cryptocurrencies": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching cryptocurrency data: {str(e)}")
            return {
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_currency_data(self) -> Dict[str, Any]:
        """
        Get currency pair data
        
        Returns:
            Dictionary with currency pair data
        """
        try:
            results = {}
            for symbol, name in self.currency_pairs.items():
                try:
                    ticker = yf.Ticker(symbol)
                    data = ticker.history(period="1d")
                    
                    if not data.empty:
                        last_close = float(data['Close'].iloc[-1])
                        last_open = float(data['Open'].iloc[-1])
                        prev_close = float(data['Close'].iloc[-2]) if len(data) > 1 else last_open
                        
                        results[symbol] = {
                            "symbol": symbol,
                            "name": name,
                            "lastPrice": round(last_close, 4),
                            "openPrice": round(last_open, 4),
                            "change": round(last_close - prev_close, 4),
                            "changePercent": round(((last_close - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0,
                            "type": "Currency",
                            "timestamp": datetime.now().isoformat()
                        }
                except Exception as e:
                    logger.error(f"Error fetching currency {symbol}: {str(e)}")
                    continue
            
            return {
                "currencies": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching currency data: {str(e)}")
            return {
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_global_indices(self) -> Dict[str, Any]:
        """
        Get global market indices data
        
        Returns:
            Dictionary with global indices data
        """
        try:
            results = {}
            for symbol, name in self.global_indices.items():
                try:
                    ticker = yf.Ticker(symbol)
                    data = ticker.history(period="1d")
                    
                    if not data.empty:
                        last_close = float(data['Close'].iloc[-1])
                        last_open = float(data['Open'].iloc[-1])
                        prev_close = float(data['Close'].iloc[-2]) if len(data) > 1 else last_open
                        
                        results[symbol] = {
                            "symbol": symbol,
                            "name": name,
                            "lastPrice": round(last_close, 2),
                            "openPrice": round(last_open, 2),
                            "change": round(last_close - prev_close, 2),
                            "changePercent": round(((last_close - prev_close) / prev_close) * 100, 2) if prev_close > 0 else 0,
                            "type": "Index",
                            "timestamp": datetime.now().isoformat()
                        }
                except Exception as e:
                    logger.error(f"Error fetching index {symbol}: {str(e)}")
                    continue
            
            return {
                "global_indices": results,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching global indices data: {str(e)}")
            return {
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }

    def get_sector_performance(self, market: str = "INDIA") -> Dict[str, Any]:
        """
        Get sector-wise performance data
        
        Args:
            market: Market type ("INDIA" or "USA")
        
        Returns:
            Dictionary with sector performance data
        """
        try:
            if market == "INDIA":
                # Indian sector representatives
                sector_stocks = {
                    "IT": ["TCS", "INFY", "WIPRO", "HCLTECH"],
                    "Banking": ["HDFCBANK", "ICICIBANK", "SBIN", "AXISBANK"],
                    "FMCG": ["HINDUNILVR", "ITC", "NESTLEIND"],
                    "Auto": ["MARUTI", "BAJAJ-AUTO", "M&M"],
                    "Pharma": ["SUNPHARMA", "DRREDDY", "CIPLA"],
                    "Energy": ["RELIANCE", "ONGC", "BPCL"]
                }
                exchange = "NSE"
            else:  # USA
                # US sector representatives
                sector_stocks = {
                    "Technology": ["AAPL", "MSFT", "GOOGL", "NVDA"],
                    "Healthcare": ["JNJ", "PFE", "UNH", "ABBV"],
                    "Finance": ["JPM", "BAC", "WFC", "GS"],
                    "Consumer": ["AMZN", "WMT", "HD", "MCD"],
                    "Energy": ["XOM", "CVX", "SLB", "COP"],
                    "Industrial": ["BA", "GE", "CAT", "MMM"]
                }
                exchange = "US"
            
            sector_performance = {}
            
            for sector, stocks in sector_stocks.items():
                try:
                    # Get data for sector stocks
                    sector_data = self.get_multiple_stocks(stocks, exchange)
                    
                    # Calculate sector average performance
                    valid_changes = []
                    for stock_data in sector_data.values():
                        if "error" not in stock_data and stock_data.get("changePercent") is not None:
                            valid_changes.append(stock_data["changePercent"])
                    
                    if valid_changes:
                        avg_change = sum(valid_changes) / len(valid_changes)
                        sector_performance[sector] = {
                            "sector": sector,
                            "avgChangePercent": round(avg_change, 2),
                            "stocksTracked": len(valid_changes),
                            "stocks": sector_data
                        }
                    else:
                        sector_performance[sector] = {
                            "sector": sector,
                            "error": "No valid data available",
                            "stocksTracked": 0
                        }
                        
                except Exception as e:
                    sector_performance[sector] = {
                        "sector": sector,
                        "error": f"Error: {str(e)}",
                        "stocksTracked": 0
                    }
            
            return {
                "market": market,
                "sectors": sector_performance,
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching sector performance for {market}: {str(e)}")
            return {
                "market": market,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_portfolio_prices(self, portfolio_symbols: List[str]) -> Dict[str, Any]:
        """
        Get current prices for a portfolio of stocks
        
        Args:
            portfolio_symbols: List of stock symbols in portfolio
        
        Returns:
            Dictionary with portfolio price data
        """
        try:
            # Try NSE first, then BSE for any failures
            nse_results = self.get_multiple_stocks(portfolio_symbols, "NSE")
            
            # Retry failed stocks with BSE
            failed_symbols = [symbol for symbol, data in nse_results.items() if "error" in data]
            if failed_symbols:
                logger.info(f"Retrying {len(failed_symbols)} symbols on BSE")
                bse_results = self.get_multiple_stocks(failed_symbols, "BSE")
                
                # Update with BSE results
                for symbol, data in bse_results.items():
                    if "error" not in data:
                        nse_results[symbol] = data
            
            # Calculate portfolio summary
            total_stocks = len(portfolio_symbols)
            successful_fetches = len([data for data in nse_results.values() if "error" not in data])
            
            return {
                "stocks": nse_results,
                "summary": {
                    "totalStocks": total_stocks,
                    "successfulFetches": successful_fetches,
                    "failedFetches": total_stocks - successful_fetches,
                    "successRate": round((successful_fetches / total_stocks) * 100, 2) if total_stocks > 0 else 0,
                    "timestamp": datetime.now().isoformat(),
                    "dataSource": "yfinance"
                }
            }
            
        except Exception as e:
            logger.error(f"Error fetching portfolio prices: {str(e)}")
            return {
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }

    def get_historical_data(self, symbol: str, exchange: str = "NSE", period: str = "30y") -> Dict[str, Any]:
        """
        Get comprehensive historical data with 30-year analytics including XRR, average returns, and detailed metrics
        
        Args:
            symbol: Stock symbol
            exchange: Exchange (NSE, BSE, US)
            period: Time period (30y, 20y, 10y, 5y, 3y, 1y, 6mo, 3mo, 1mo)
        
        Returns:
            Dictionary with comprehensive historical analytics
        """
        try:
            # Format ticker based on exchange
            if exchange.upper() == "NSE":
                ticker = f"{symbol}{self.nse_suffix}"
            elif exchange.upper() == "BSE":
                ticker = f"{symbol}{self.bse_suffix}"
            else:
                ticker = symbol
            
            # Get historical data
            stock = yf.Ticker(ticker)
            hist = stock.history(period=period)
            
            if hist.empty:
                return {
                    "success": False,
                    "error": "No historical data available",
                    "symbol": symbol,
                    "exchange": exchange,
                    "timestamp": datetime.now().isoformat()
                }
            
            # Calculate comprehensive analytics
            analytics = self._calculate_historical_analytics(hist, symbol)
            
            # Format historical data for charting
            chart_data = []
            for date, row in hist.iterrows():
                chart_data.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "open": round(row['Open'], 2),
                    "high": round(row['High'], 2),
                    "low": round(row['Low'], 2),
                    "close": round(row['Close'], 2),
                    "volume": int(row['Volume']),
                    "returns": round(((row['Close'] - row['Open']) / row['Open']) * 100, 2) if row['Open'] != 0 else 0
                })
            
            return {
                "success": True,
                "symbol": symbol,
                "exchange": exchange,
                "period": period,
                "analytics": analytics,
                "chart_data": chart_data,
                "data_points": len(chart_data),
                "timestamp": datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching historical data for {symbol}: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "symbol": symbol,
                "exchange": exchange,
                "timestamp": datetime.now().isoformat()
            }

    def _calculate_historical_analytics(self, hist: pd.DataFrame, symbol: str) -> Dict[str, Any]:
        """
        Calculate comprehensive historical analytics including XRR, average returns, volatility, and risk metrics
        
        Args:
            hist: Historical price data DataFrame
            symbol: Stock symbol
            
        Returns:
            Dictionary with detailed analytics
        """
        try:
            # Basic price metrics
            current_price = hist['Close'].iloc[-1]
            start_price = hist['Close'].iloc[0]
            
            # Calculate returns
            hist['Daily_Returns'] = hist['Close'].pct_change()
            hist['Cumulative_Returns'] = (1 + hist['Daily_Returns']).cumprod()
            
            # Time-based calculations
            years = len(hist) / 252  # Approximate trading days per year
            
            # Total return and CAGR
            total_return = ((current_price - start_price) / start_price) * 100
            cagr = (((current_price / start_price) ** (1/years)) - 1) * 100 if years > 0 else 0
            
            # XRR (Extended Rate of Return) - Annualized return with compounding
            xrr = cagr  # XRR is essentially CAGR for stock analysis
            
            # Average returns
            daily_returns = hist['Daily_Returns'].dropna()
            avg_daily_return = daily_returns.mean() * 100
            avg_monthly_return = avg_daily_return * 21  # Approximate trading days per month
            avg_annual_return = avg_daily_return * 252  # Approximate trading days per year
            
            # Volatility metrics
            volatility_daily = daily_returns.std() * 100
            volatility_annual = volatility_daily * np.sqrt(252)
            
            # Risk metrics
            max_drawdown = self._calculate_max_drawdown(hist['Close'])
            sharpe_ratio = self._calculate_sharpe_ratio(daily_returns)
            
            # Price ranges
            price_52w_high = hist['High'].tail(252).max() if len(hist) >= 252 else hist['High'].max()
            price_52w_low = hist['Low'].tail(252).min() if len(hist) >= 252 else hist['Low'].min()
            price_range = ((price_52w_high - price_52w_low) / price_52w_low) * 100
            
            # Moving averages
            ma_20 = hist['Close'].rolling(20).mean().iloc[-1] if len(hist) >= 20 else current_price
            ma_50 = hist['Close'].rolling(50).mean().iloc[-1] if len(hist) >= 50 else current_price
            ma_200 = hist['Close'].rolling(200).mean().iloc[-1] if len(hist) >= 200 else current_price
            
            # Yearly breakdown
            yearly_returns = self._calculate_yearly_returns(hist)
            
            # Risk-adjusted returns
            risk_adjusted_return = cagr / volatility_annual if volatility_annual != 0 else 0
            
            return {
                "price_metrics": {
                    "current_price": round(current_price, 2),
                    "start_price": round(start_price, 2),
                    "total_return_percent": round(total_return, 2),
                    "price_52w_high": round(price_52w_high, 2),
                    "price_52w_low": round(price_52w_low, 2),
                    "price_range_percent": round(price_range, 2)
                },
                "returns_analysis": {
                    "xrr_percent": round(xrr, 2),  # Extended Rate of Return
                    "cagr_percent": round(cagr, 2),  # Compound Annual Growth Rate
                    "avg_daily_return_percent": round(avg_daily_return, 4),
                    "avg_monthly_return_percent": round(avg_monthly_return, 2),
                    "avg_annual_return_percent": round(avg_annual_return, 2),
                    "risk_adjusted_return": round(risk_adjusted_return, 2)
                },
                "risk_metrics": {
                    "volatility_daily_percent": round(volatility_daily, 4),
                    "volatility_annual_percent": round(volatility_annual, 2),
                    "max_drawdown_percent": round(max_drawdown, 2),
                    "sharpe_ratio": round(sharpe_ratio, 3),
                    "beta": 1.0  # Default beta, would need market data for actual calculation
                },
                "technical_indicators": {
                    "ma_20": round(ma_20, 2),
                    "ma_50": round(ma_50, 2),
                    "ma_200": round(ma_200, 2),
                    "rsi": self._calculate_rsi(hist['Close'])
                },
                "yearly_performance": yearly_returns,
                "analysis_period": {
                    "years": round(years, 2),
                    "total_trading_days": len(hist),
                    "data_start": hist.index[0].strftime("%Y-%m-%d"),
                    "data_end": hist.index[-1].strftime("%Y-%m-%d")
                }
            }
            
        except Exception as e:
            logger.error(f"Error calculating analytics: {str(e)}")
            return {
                "error": str(e),
                "symbol": symbol
            }

    def _calculate_max_drawdown(self, prices: pd.Series) -> float:
        """Calculate maximum drawdown"""
        try:
            rolling_max = prices.expanding().max()
            drawdown = (prices - rolling_max) / rolling_max
            return drawdown.min() * 100
        except:
            return 0.0

    def _calculate_sharpe_ratio(self, returns: pd.Series, risk_free_rate: float = 0.05) -> float:
        """Calculate Sharpe ratio"""
        try:
            excess_returns = returns - (risk_free_rate / 252)  # Daily risk-free rate
            return excess_returns.mean() / excess_returns.std() * np.sqrt(252)
        except:
            return 0.0

    def _calculate_rsi(self, prices: pd.Series, period: int = 14) -> float:
        """Calculate RSI (Relative Strength Index)"""
        try:
            delta = prices.diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))
            return round(rsi.iloc[-1], 2)
        except:
            return 50.0

    def _calculate_yearly_returns(self, hist: pd.DataFrame) -> List[Dict[str, Any]]:
        """Calculate year-wise returns"""
        try:
            yearly_data = []
            hist_copy = hist.copy()
            hist_copy['Year'] = hist_copy.index.year
            
            for year in hist_copy['Year'].unique():
                year_data = hist_copy[hist_copy['Year'] == year]
                if len(year_data) > 0:
                    year_start = year_data['Close'].iloc[0]
                    year_end = year_data['Close'].iloc[-1]
                    year_return = ((year_end - year_start) / year_start) * 100
                    year_high = year_data['High'].max()
                    year_low = year_data['Low'].min()
                    
                    yearly_data.append({
                        "year": int(year),
                        "return_percent": round(year_return, 2),
                        "start_price": round(year_start, 2),
                        "end_price": round(year_end, 2),
                        "high": round(year_high, 2),
                        "low": round(year_low, 2),
                        "trading_days": len(year_data)
                    })
            
            return sorted(yearly_data, key=lambda x: x['year'])
        except:
            return []

def main():
    """Main function for CLI usage"""
    if len(sys.argv) < 2:
        print("Usage: python stockPriceService.py <command> [args]")
        print("Commands:")
        print("  single <symbol> [exchange]  - Get single stock price")
        print("  multiple <symbol1,symbol2,...> [exchange]  - Get multiple stock prices")
        print("  portfolio <symbol1,symbol2,...>  - Get portfolio prices")
        print("  indices <market>  - Get market indices (INDIA/USA)")
        print("  movers <market> <type>  - Get market movers (INDIA/USA, gainers/losers)")
        print("  sectors <market>  - Get sector performance (INDIA/USA)")
        print("  etfs <market>  - Get ETF data (INDIA/USA)")
        print("  commodities  - Get commodity futures data")
        print("  crypto  - Get cryptocurrency data")
        print("  currencies  - Get currency pairs data")
        print("  global_indices  - Get global market indices")
        print("  historical <symbol> [exchange] [period]  - Get historical data with analytics")
        return
    
    service = StockPriceService()
    command = sys.argv[1]
    
    if command == "single":
        if len(sys.argv) < 3:
            print("Error: Symbol required")
            return
        
        symbol = sys.argv[2]
        exchange = sys.argv[3] if len(sys.argv) > 3 else "NSE"
        
        result = service.get_stock_price(symbol, exchange)
        print(json.dumps(result, indent=2))
    
    elif command == "multiple":
        if len(sys.argv) < 3:
            print("Error: Symbols required")
            return
        
        symbols = sys.argv[2].split(",")
        exchange = sys.argv[3] if len(sys.argv) > 3 else "NSE"
        
        result = service.get_multiple_stocks(symbols, exchange)
        print(json.dumps(result, indent=2))
    
    elif command == "portfolio":
        if len(sys.argv) < 3:
            print("Error: Portfolio symbols required")
            return
        
        symbols = sys.argv[2].split(",")
        
        result = service.get_portfolio_prices(symbols)
        print(json.dumps(result, indent=2))
    
    elif command == "indices":
        if len(sys.argv) < 3:
            print("Error: Market required (INDIA/USA)")
            return
        
        market = sys.argv[2]
        
        result = service.get_market_indices(market)
        print(json.dumps(result, indent=2))
    
    elif command == "movers":
        if len(sys.argv) < 4:
            print("Error: Market and type required (INDIA/USA, gainers/losers)")
            return
        
        market = sys.argv[2]
        mover_type = sys.argv[3]
        
        result = service.get_market_movers(market, mover_type)
        print(json.dumps(result, indent=2))
    
    elif command == "sectors":
        if len(sys.argv) < 3:
            print("Error: Market required (INDIA/USA)")
            return
        
        market = sys.argv[2]
        
        result = service.get_sector_performance(market)
        print(json.dumps(result, indent=2))
    
    elif command == "etfs":
        if len(sys.argv) < 3:
            print("Error: Market required (INDIA/USA)")
            return
        
        market = sys.argv[2]
        
        result = service.get_etf_data(market)
        print(json.dumps(result, indent=2))
    
    elif command == "commodities":
        result = service.get_commodity_data()
        print(json.dumps(result, indent=2))
    
    elif command == "crypto":
        result = service.get_cryptocurrency_data()
        print(json.dumps(result, indent=2))
    
    elif command == "currencies":
        result = service.get_currency_data()
        print(json.dumps(result, indent=2))
    
    elif command == "global_indices":
        result = service.get_global_indices()
        print(json.dumps(result, indent=2))
    
    elif command == "historical":
        if len(sys.argv) < 3:
            print("Error: Symbol required")
            return
        
        symbol = sys.argv[2]
        exchange = sys.argv[3] if len(sys.argv) > 3 else "NSE"
        period = sys.argv[4] if len(sys.argv) > 4 else "30y"
        
        result = service.get_historical_data(symbol, exchange, period)
        print(json.dumps(result, indent=2))
    
    else:
        print(f"Error: Unknown command '{command}'")

if __name__ == "__main__":
    main()