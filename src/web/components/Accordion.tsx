import { Disclosure } from "@headlessui/react";
import Icon from "./Icon";

const Accordion = ({ title, children, ...props }) => {
  return (
    <div className="w-full">
      <Disclosure {...props}>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button className="w-full flex items-center justify-between p-4 bg-card-foreground bg-opacity-5 rounded-2xl space-x-4">
                <p className="font-bold text-lg">{title}</p>
                <Icon variant={open ? "resta" : "suma"} width={24} />
              </Disclosure.Button>
              <Disclosure.Panel>{children}</Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};

export default Accordion;
