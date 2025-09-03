import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

export default function Goals() {
  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Goals</h2>
        <button className="bg-primary text-white rounded-full px-3 py-1 text-sm font-medium flex items-center">
          <span className="material-icons text-sm mr-1">add</span>
          Add Goal
        </button>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-primary">home</span>
              </div>
              <div>
                <h3 className="font-medium">Home Purchase</h3>
                <p className="text-xs text-[#757575]">Target: 2027</p>
              </div>
            </div>
            <div className="text-sm font-medium">₹75,00,000</div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>35%</span>
            </div>
            <Progress value={35} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#757575] text-xs">Current Value</p>
              <p className="font-medium">₹26,25,000</p>
            </div>
            <div>
              <p className="text-[#757575] text-xs">Monthly Investment</p>
              <p className="font-medium">₹25,000</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <button className="text-xs border border-gray-300 rounded-full px-3 py-1">Edit</button>
            <button className="text-xs bg-primary text-white rounded-full px-3 py-1">Top Up</button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#388E3C] bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-[#388E3C]">school</span>
              </div>
              <div>
                <h3 className="font-medium">Child's Education</h3>
                <p className="text-xs text-[#757575]">Target: 2030</p>
              </div>
            </div>
            <div className="text-sm font-medium">₹50,00,000</div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>22%</span>
            </div>
            <Progress value={22} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#757575] text-xs">Current Value</p>
              <p className="font-medium">₹11,00,000</p>
            </div>
            <div>
              <p className="text-[#757575] text-xs">Monthly Investment</p>
              <p className="font-medium">₹15,000</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <button className="text-xs border border-gray-300 rounded-full px-3 py-1">Edit</button>
            <button className="text-xs bg-primary text-white rounded-full px-3 py-1">Top Up</button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#FF9800] bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-[#FF9800]">flight</span>
              </div>
              <div>
                <h3 className="font-medium">Vacation</h3>
                <p className="text-xs text-[#757575]">Target: 2023</p>
              </div>
            </div>
            <div className="text-sm font-medium">₹5,00,000</div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>82%</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#757575] text-xs">Current Value</p>
              <p className="font-medium">₹4,10,000</p>
            </div>
            <div>
              <p className="text-[#757575] text-xs">Monthly Investment</p>
              <p className="font-medium">₹10,000</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <button className="text-xs border border-gray-300 rounded-full px-3 py-1">Edit</button>
            <button className="text-xs bg-primary text-white rounded-full px-3 py-1">Top Up</button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#F44336] bg-opacity-10 flex items-center justify-center mr-3">
                <span className="material-icons text-[#F44336]">account_balance</span>
              </div>
              <div>
                <h3 className="font-medium">Retirement</h3>
                <p className="text-xs text-[#757575]">Target: 2045</p>
              </div>
            </div>
            <div className="text-sm font-medium">₹3,00,00,000</div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#757575] text-xs">Current Value</p>
              <p className="font-medium">₹45,00,000</p>
            </div>
            <div>
              <p className="text-[#757575] text-xs">Monthly Investment</p>
              <p className="font-medium">₹30,000</p>
            </div>
          </div>
          
          <div className="mt-3 flex justify-between">
            <button className="text-xs border border-gray-300 rounded-full px-3 py-1">Edit</button>
            <button className="text-xs bg-primary text-white rounded-full px-3 py-1">Top Up</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
