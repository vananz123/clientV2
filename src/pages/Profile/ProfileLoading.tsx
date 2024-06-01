import SkeletonCard from '@/conponents/SkeletonCard';

function ProfileLoading() {
    return (
        <div className='w-full'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='w-full h-[150px] mb-3'>
                    <SkeletonCard className='w-full h-full' />
                </div>
            ))}
        </div>
    );
}

export default ProfileLoading;
