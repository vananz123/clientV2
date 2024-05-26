import SkeletonCard from '@/conponents/SkeletonCard';

function ProfileLoading() {
    return (
        <div style={{ width: '100%' }}>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} style={{ width: '100%', height: 150, marginBottom: 10 }}>
                    <SkeletonCard style={{ width: '100%', height: '100%' }} />
                </div>
            ))}
        </div>
    );
}

export default ProfileLoading;
