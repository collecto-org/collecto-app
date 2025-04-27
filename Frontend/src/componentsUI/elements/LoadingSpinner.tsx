import collectoLoading from "/logos/collecto-loading.gif"

interface LoadingSpinnerProps{
  message?: string;
}

export default function LoadingSpinner({message}: LoadingSpinnerProps) {
    return (
      <div className="flex flex-col items-center justify-center  min-h[300px] space-y-4">
        <img src={collectoLoading}  alt="Loading..." className="h-20" />
        {message && <p className="text-darkblue font-medium text-center">{message}</p> }
        
      </div>
    );
  }
  