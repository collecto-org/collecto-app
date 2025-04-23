import collectoLoading from "../../../public/logos/collecto-loading.gif"

function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-full">
        <img src={collectoLoading}  alt="Loading..." className="h-20" />
      </div>
    );
  }
  
  export default LoadingSpinner;