import Image from "./Image";

export default function PlaceImg({ place, index = 0 }) {
    // If the place or its addedphotos are not available, return null to avoid rendering anything.
    if (!place?.addedphotos?.length) {
        return null;
    }

    return (
        <div>
            <img
                className="h-full border rounded-xl object-cover"
                src={`https://hoteltravelbooking-mern.onrender.com/api/uploads/${place.addedphotos[index]}`}
                alt="Place"
            />
        </div>
    );
}