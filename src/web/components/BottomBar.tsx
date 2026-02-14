const BottomBar = ({ children, ...props }) => {
  return (
    <div
      className="fixed bottom-0 left-0 z-10 w-full bg-card p-4 shadow lg:relative lg:left-auto lg:bottom-auto lg:m-auto lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-transparent"
      {...props}
    >
      {children}
    </div>
  );
};

export default BottomBar;
