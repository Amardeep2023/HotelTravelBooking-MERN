import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setShowAllPhotos(false)}
          className="absolute top-5 right-5 bg-gray-200 text-black p-2 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Gallery */}
        <h2 className="text-3xl text-white mb-6 text-center mt-10">
          {place.title}
        </h2>
        <div className="flex flex-col items-center gap-6 p-4 overflow-y-auto">
          {place?.addedphotos?.length > 0 &&
            place.addedphotos.map((photo, index) => (
              <div key={index} className="w-full max-w-4xl">
                <img
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt=""
                  className="w-full object-contain rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-3 grid-cols-[2fr_1fr] overflow-hidden mt-3 rounded-2xl object-contain ">
        <div>
          {place.addedphotos?.[0] && (
            <img 
              src={`https://hoteltravelbooking-mern.onrender.com/api/uploads/${place.addedphotos[0]}`}
              alt=""
            />
          )}
        </div>
        <div className="grid object-cover  overflow-hidden">
          {place.addedphotos?.[1] && (
            <img
              src={`http://localhost:4000/uploads/${place.addedphotos[1]}`}
              alt=""
            />
          )}
          <div className="relative  top-3">
            {place.addedphotos?.[2] && (
              <img
                src={`http://localhost:4000/uploads/${place.addedphotos[2]}`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-1 right-2 p-1 bg-slate-200 rounded-2xl hover:bg-slate-300"
      >
        <span>Show More Photos</span>
      </button>
    </div>
  );
}
