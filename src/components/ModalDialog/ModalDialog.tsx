interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalDialog = ({ isOpen, onClose, children }: ModalDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog open className="backdrop:bg-gray-50 fixed inset-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose} data-testid="backdrop">
      <div className="relative bg-white rounded-3xl p-10 mx-2 lg:mx-[14rem] z-50 w-full h-full md:h-auto" onClick={(e) => e.stopPropagation()}>
        <div className="cursor-pointer font-black p-3 text-right" onClick={onClose}>X</div>
        <div className="overflow-auto h-[90%] pb-2">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default ModalDialog;
