import { Card, CardContent } from "../components/ui/card";

export default function Insights() {
  return (
    <div className="px-4 py-3">
      <h2 className="text-xl font-semibold mb-4">Insights</h2>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-2">Portfolio Performance</h3>
          
          <div className="h-40 mb-3 flex justify-center items-center bg-gray-100 rounded-lg">
            <span className="material-icons text-5xl text-[#757575]">insert_chart</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-center">
            <button className="text-xs py-1 bg-primary text-white rounded">1M</button>
            <button className="text-xs py-1 border border-gray-200 rounded">3M</button>
            <button className="text-xs py-1 border border-gray-200 rounded">6M</button>
            <button className="text-xs py-1 border border-gray-200 rounded">1Y</button>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-[#757575]">Current Value</p>
              <p className="font-medium">₹12,57,843</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#757575]">Invested</p>
              <p className="font-medium">₹10,25,000</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#757575]">Returns</p>
              <p className="font-medium text-success">+22.7%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Investment Growth</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">HDFC Midcap Opportunities</h4>
                <span className="text-success font-medium">+14.17%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '14.17%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Axis Banking & PSU Debt Fund</h4>
                <span className="text-success font-medium">+4.82%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '4.82%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">Nippon India Gold ETF</h4>
                <span className="text-success font-medium">+17.40%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: '17.40%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Risk Analysis</h3>
          
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 relative">
              <div className="h-16 w-16 rounded-full border-4 border-[#FFC107]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold">7.2</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-medium">Moderate Risk</h4>
              <p className="text-xs text-[#757575]">Your portfolio has a balanced risk profile</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="h-16 flex items-end">
                <div className="w-full bg-[#F44336]" style={{ height: '60%' }}></div>
              </div>
              <p className="text-xs mt-1">High Risk</p>
              <p className="text-xs font-medium">20%</p>
            </div>
            <div>
              <div className="h-16 flex items-end">
                <div className="w-full bg-[#FFC107]" style={{ height: '90%' }}></div>
              </div>
              <p className="text-xs mt-1">Moderate</p>
              <p className="text-xs font-medium">65%</p>
            </div>
            <div>
              <div className="h-16 flex items-end">
                <div className="w-full bg-[#4CAF50]" style={{ height: '30%' }}></div>
              </div>
              <p className="text-xs mt-1">Low Risk</p>
              <p className="text-xs font-medium">15%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-base font-medium mb-3">Recommendations</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-primary">lightbulb</span>
              </div>
              <div>
                <h4 className="font-medium">Rebalance Your Portfolio</h4>
                <p className="text-sm text-[#757575] mt-1">Your equity allocation is higher than recommended. Consider rebalancing to reduce risk.</p>
                <button className="mt-2 text-xs bg-primary text-white px-3 py-1 rounded-full">Take Action</button>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[#FFC107] bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-[#FFC107]">lightbulb</span>
              </div>
              <div>
                <h4 className="font-medium">Increase SIP Amounts</h4>
                <p className="text-sm text-[#757575] mt-1">You're on track to meet your goals. Consider increasing your SIP amounts to reach them faster.</p>
                <button className="mt-2 text-xs bg-primary text-white px-3 py-1 rounded-full">Take Action</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
