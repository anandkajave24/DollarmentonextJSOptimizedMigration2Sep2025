import { Card, CardContent } from "../components/ui/card";
import { SEO } from '../components/SEO';

export default function Explore() {
  return (
    <>
      <SEO 
        title="Explore Investments - Discover Investment Opportunities & Recommendations"
        description="Explore personalized investment recommendations, trending opportunities, and discover the best investment options for your financial goals. Find mutual funds, ETFs, stocks, and more investment products."
        keywords="explore investments, investment opportunities, investment recommendations, mutual funds, ETFs, stock investments, investment discovery, investment products, financial products"
        canonical="https://dollarmento.com/explore"
      />
      <div className="px-4 py-3">
      <h2 className="text-xl font-semibold mb-4">Explore Investments</h2>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium">Recommended for You</h3>
            <span className="text-sm text-primary font-medium">See All</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                  <span className="material-icons text-primary">trending_up</span>
                </div>
                <div>
                  <h4 className="font-medium">ICICI Prudential Bluechip</h4>
                  <p className="text-xs text-[#757575]">Large Cap • Equity</p>
                </div>
              </div>
              <div className="text-success font-medium">+16.8%</div>
            </div>
            
            <div className="flex justify-between items-center border-b pb-3 border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#388E3C] bg-opacity-10 flex items-center justify-center mr-3">
                  <span className="material-icons text-[#388E3C]">account_balance</span>
                </div>
                <div>
                  <h4 className="font-medium">Kotak Corporate Bond Fund</h4>
                  <p className="text-xs text-[#757575]">Corporate Bonds • Debt</p>
                </div>
              </div>
              <div className="text-success font-medium">+8.2%</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-3">
                  <span className="material-icons text-[#FF9800]">savings</span>
                </div>
                <div>
                  <h4 className="font-medium">SBI Gold Fund</h4>
                  <p className="text-xs text-[#757575]">Gold • Commodity</p>
                </div>
              </div>
              <div className="text-success font-medium">+12.5%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium">Categories</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <span className="material-icons text-primary mb-1">trending_up</span>
              <h4 className="font-medium">Equity</h4>
              <p className="text-xs text-[#757575]">High returns, high risk</p>
            </div>
            
            <div className="bg-[#388E3C]/10 p-3 rounded-lg">
              <span className="material-icons text-[#388E3C] mb-1">account_balance</span>
              <h4 className="font-medium">Debt</h4>
              <p className="text-xs text-[#757575]">Moderate returns, low risk</p>
            </div>
            
            <div className="bg-[#FF9800]/10 p-3 rounded-lg">
              <span className="material-icons text-[#FF9800] mb-1">savings</span>
              <h4 className="font-medium">Gold</h4>
              <p className="text-xs text-[#757575]">Hedge against inflation</p>
            </div>
            
            <div className="bg-[#FFC107]/10 p-3 rounded-lg">
              <span className="material-icons text-[#FFC107] mb-1">business</span>
              <h4 className="font-medium">Tax Saving</h4>
              <p className="text-xs text-[#757575]">Save taxes under 80C</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium">Top Rated Funds</h3>
            <span className="text-sm text-primary font-medium">Filter</span>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-3 border-gray-100">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Mirae Asset Emerging Bluechip</h4>
                <div className="bg-[#FFC107] text-[#212121] px-2 rounded text-xs font-medium">★★★★★</div>
              </div>
              <p className="text-xs text-[#757575]">Mid Cap • Equity</p>
              <div className="flex justify-between mt-2">
                <div className="text-xs">
                  <p className="text-[#757575]">3Y Returns</p>
                  <p className="font-medium text-success">+22.4%</p>
                </div>
                <div className="text-xs">
                  <p className="text-[#757575]">5Y Returns</p>
                  <p className="font-medium text-success">+18.7%</p>
                </div>
                <button className="text-xs bg-primary text-white px-3 py-1 rounded-full">Invest</button>
              </div>
            </div>
            
            <div className="border-b pb-3 border-gray-100">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Axis Long Term Equity Fund</h4>
                <div className="bg-[#FFC107] text-[#212121] px-2 rounded text-xs font-medium">★★★★☆</div>
              </div>
              <p className="text-xs text-[#757575]">ELSS • Tax Saving</p>
              <div className="flex justify-between mt-2">
                <div className="text-xs">
                  <p className="text-[#757575]">3Y Returns</p>
                  <p className="font-medium text-success">+17.8%</p>
                </div>
                <div className="text-xs">
                  <p className="text-[#757575]">5Y Returns</p>
                  <p className="font-medium text-success">+15.2%</p>
                </div>
                <button className="text-xs bg-primary text-white px-3 py-1 rounded-full">Invest</button>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">HDFC Short Term Debt Fund</h4>
                <div className="bg-[#FFC107] text-[#212121] px-2 rounded text-xs font-medium">★★★★☆</div>
              </div>
              <p className="text-xs text-[#757575]">Short Duration • Debt</p>
              <div className="flex justify-between mt-2">
                <div className="text-xs">
                  <p className="text-[#757575]">3Y Returns</p>
                  <p className="font-medium text-success">+7.2%</p>
                </div>
                <div className="text-xs">
                  <p className="text-[#757575]">5Y Returns</p>
                  <p className="font-medium text-success">+8.1%</p>
                </div>
                <button className="text-xs bg-primary text-white px-3 py-1 rounded-full">Invest</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
