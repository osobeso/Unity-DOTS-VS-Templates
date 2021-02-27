using Unity.Entities;
using Unity.Physics;

namespace $rootnamespace$
{
    public struct $safeitemname$<T> : ICollector<T>
    where T : struct, IQueryResult
    {
        public bool EarlyOutOnFirstHit => false;

        public float MaxFraction => 1f;

        public int NumHits { get; private set; }

        /// T can either be RayCastHit or ColliderCastHit.
        public T ClosestHit { get; set; }

        public Entity selfEntity;

        private CollisionWorld collisionWorld;

        /// <summary>
        /// This constructor is not required, but this shows a quick example of how these ray casts can be implemented.
        /// for this example we are ignoring the owner of the casted collider/raycast.
        /// </summary>
        /// <param name="entity">The entity that owns the Collider/Raycast that is being casted.</param>
        /// <param name="collisionWorld">The current Collision World.</param>
        public $safeitemname$(Entity entity, CollisionWorld collisionWorld)
        {
            ClosestHit = default;
            NumHits = 0;
            this.selfEntity = entity;
            this.collisionWorld = collisionWorld;
        }

        public bool AddHit(T hit)
        {
            var collisionEntity = collisionWorld.Bodies[hit.RigidBodyIndex].Entity;

            if (collisionEntity == selfEntity)
            {
                return false;
            }

            ClosestHit = hit;
            NumHits = 1;
            return true;
        }
    }
}