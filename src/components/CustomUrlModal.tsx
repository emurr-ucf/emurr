import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { urlLocalPath, urlPath } from '../lib/urlPath';

interface CustomUrlModalProps {
  pageId: string;
  tourId: string;
}

export const CustomUrlModal = ({ tourId, pageId }: CustomUrlModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customURL, setCustomURL] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <div className="flex items-center justify-center shrink-0">
        <img 
          src={`${urlLocalPath}/images/custom-url.svg`}
          alt="custom url"
          title="Inset Custom URL"
          onClick={() => setIsOpen(true)}
          className="w-7 h-7 p-1 hover:bg-background-400 rounded transition ease-in-out"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Insert Custom URL
                  </Dialog.Title>
                  <div className="mt-2">
                    <input 
                      onChange={(event) => setCustomURL(event.target.value)}
                      placeholder="Custom URL..."
                      className="w-full h-10 bg-inherit border-b-2 p-1 text-green-900 border-brown focus:outline-brown transition ease-in-out"
                    />
                    {error}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={async () => {
                        const res = await fetch( `${urlPath}/api/pagedb`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            tourId,
                            pageId,
                            customURL,
                          }),
                        });

                        const json = await res.json();

                        if (res.status != 200) {
                          setError(json.error);
                        } else {
                          setError("");
                          setIsOpen(false);
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
