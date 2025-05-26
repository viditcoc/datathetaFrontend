import { ChartNoAxesCombined , List, Bookmark} from 'lucide-react';
 
const LocationItem = ({ title, id, location }) => {
  return (
    <div className="flex flex-col justify-between py-3 px-4">
      <div className='flex justify-between items-center mb-2'>
        <span className='text-gray-800 leading-none text-sm'>{id}</span>
        <div className="flex space-x-2">
         {/* <button className="p-1"><List className="text-blue-600" size={20} strokeWidth={1.5}/></button> */}
        {/* <button className="p-1"><Bookmark className="text-blue-600" size={20} strokeWidth={1.5}/></button> */}
      </div>
      </div>
      <span className='text-blue-800 font-semibold'>{title}</span>
      
      <span className='text-gray-400 text-sm'>{location}</span>
      
    </div>
  );
};

  export default LocationItem;