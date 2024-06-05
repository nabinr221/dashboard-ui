import { AlertCircle } from 'lucide-react';
const ErrorMsg = (msg) => {
  console.log(msg, 'error');
  return (
    <div className="w-full  bg-yellow-100 p-2">
      <div className="flex items-center  space-x-4">
        <div>
          <AlertCircle className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-yellow-600">{msg.msg}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMsg;
