import { Dialog } from '@headlessui/react';
import { type ReactNode } from 'react';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SearchModal = ({ open, onClose, children }: SearchModalProps) => (
  <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
    <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center">
      <Dialog.Panel className="bg-white w-full h-full p-4 overflow-y-auto">
        {children}
      </Dialog.Panel>
    </div>
    <div></div>
  </Dialog>
);

export default SearchModal;
