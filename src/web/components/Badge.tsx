const Badge = ({ children }) => {
  return (
    <div className="flex-grow-0 inline-block px-4 py-1 m-auto font-bold tracking-wide uppercase text-[0.75rem] bg-primary rounded-2xl text-card-foreground bg-opacity-60">
      <span className="">{children}</span>
    </div>
  );
};

export default Badge;
