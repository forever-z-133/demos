/// <reference types="vite/client" />

declare type ArrayElement<A> = A extends (infer T)[] ? T : never
