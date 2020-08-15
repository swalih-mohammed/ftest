import React, {Suspense} from 'react'
import {useImage} from 'react-image'
import {Img} from 'react-image'
 
const myComponent = (src) => (
    <Img
      src={src}
      unloader={/*any valid react element */}
    />
  )