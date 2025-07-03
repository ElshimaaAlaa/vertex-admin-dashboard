function MainBtn({ text, onclick, btnType, ...props }) {
  return (
    <div>
      <button
        className="mainButton h-14 bg-primary rounded-md text-18 text-white font-bold outline-none w-full rtl:text-[18px] "
        onClick={onclick}
        type={btnType}
      >
        {text}
      </button>
    </div>
  );
}
export default MainBtn;