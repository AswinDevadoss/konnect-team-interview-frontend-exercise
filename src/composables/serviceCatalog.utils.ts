const textAssets:{
  service_hub:string,
  service_hub_subtext:string,
  learn_more:string,
  service_package:string
} = {
  service_hub: 'Service Hub',
  service_hub_subtext: 'Organize services, manage and track versioning and API service documentation.',
  learn_more:'Learn more',
  service_package: 'Service Package',
}

const serviceStatusText:{
  published:string,
  unpublished:string,
  in_progress:string
} = {
  published:'Published to portal',
  unpublished:'Unpublished',
  in_progress:'In progress',
}

// const serviceStatusIconPath:{
//   published:string,
//   unpublished:string,
//   in_progress:string
// } = {
//   published:'../assets/Icons.svg',
//   unpublished:'@/assets/XCross.png',
//   in_progress:'@/assets/InProgress.png',
// }

const calculateDaysAgo = function(updatedAt: string): number {
  const currentTime = new Date(); const updatedTime = new Date(updatedAt); const differenceInMilliseconds = currentTime.getTime() - updatedTime.getTime(); const millisecondsInADay = 1000 * 60 * 60 * 24; const daysAgo = Math.floor(differenceInMilliseconds / millisecondsInADay); return daysAgo
}
const formatName = function(name: string) {
  const words = name.split(' ')
  if (words.length > 1) {
    const lastName = words.pop()
    const abbreviatedLastName = `${lastName?.charAt(0)}.`
    words.push(abbreviatedLastName)
  }
  return words.join(' ')
}

const getElementsByPage = function(arr: string | any[], counter: number) {
  const itemsPerPage = 9; const startIndex = counter * itemsPerPage; const endIndex = startIndex + itemsPerPage; return arr.slice(startIndex, endIndex)
}
export { textAssets,serviceStatusText,calculateDaysAgo,formatName,getElementsByPage }
