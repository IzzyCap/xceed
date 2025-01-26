// https://vitejs.dev/guide/features.html#client-types
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}
