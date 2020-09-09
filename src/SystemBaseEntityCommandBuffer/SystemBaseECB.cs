using Unity.Collections;
using Unity.Entities;

namespace $rootnamespace$
{
    public class $safeitemname$ : SystemBase
    {
        [ReadOnly] EndSimulationEntityCommandBufferSystem ecbSystem;
        protected override void OnCreate()
        {
            ecbSystem = World.GetOrCreateSystem<EndSimulationEntityCommandBufferSystem>();
        }

        protected override void OnUpdate()
        {
        }
    }
}