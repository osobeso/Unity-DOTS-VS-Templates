﻿using UnityEngine;
using Unity.Entities;

namespace $rootnamespace$
{
    [DisallowMultipleComponent]
    [RequiresEntityConversion]
    public class $safeitemname$ : MonoBehaviour, IConvertGameObjectToEntity
    {
        public void Convert(Entity entity, EntityManager dstManager, GameObjectConversionSystem conversionSystem)
        {
            
        }
    }
}