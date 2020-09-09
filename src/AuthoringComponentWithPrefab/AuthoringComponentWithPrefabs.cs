using UnityEngine;
using Unity.Entities;
using System.Collections.Generic;

namespace $rootnamespace$
{
    [DisallowMultipleComponent]
    [RequiresEntityConversion]
    public class $safeitemname$ : MonoBehaviour, IConvertGameObjectToEntity, IDeclareReferencedPrefabs
    {
        [SerializeField]
        public GameObject[] Prefabs;
        public void Convert(Entity entity, EntityManager dstManager, GameObjectConversionSystem conversionSystem)
        {
            
        }

        public void DeclareReferencedPrefabs(List<GameObject> referencedPrefabs)
        {
            referencedPrefabs.AddRange(Prefabs);
        }
    }
}