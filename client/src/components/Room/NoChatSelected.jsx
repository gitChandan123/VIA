import svg from "../../static/texting.svg";

const NoChatSelected = () => {
  return (
    <>
      <div className="container-fluid d-flex justify-content-center bg-img">
        <img src={svg} alt="text alt" width="42%" height="40%" />
      </div>
      <div className="container-fluid d-flex justify-content-center m-4">
        <h1 style={{ fontFamily: "cursive" }}>No chat selected</h1>
      </div>
    </>
  );
};
export default NoChatSelected;
