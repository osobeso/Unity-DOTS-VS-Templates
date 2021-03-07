using Unity.Entities;
using Unity.Transforms;

namespace $rootnamespace$
{
    public static class $safeitemname$
    {
        public static ComponentType[] ComponentTypes = new ComponentType[]
        {
            new ComponentType(typeof(Translation)),
            new ComponentType(typeof(Rotation))
            // Add all required component types here..
        };

        public static EntityArchetype Create(EntityManager dstManager) 
        {
            return dstManager.CreateArchetype(ComponentTypes);
        }
    }
}