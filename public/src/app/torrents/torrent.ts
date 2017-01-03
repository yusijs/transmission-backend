export interface Torrent {
  activityDate: number;
  addedDate: number;
  bandwidthPriority: number;
  comment: string;
  corruptEver: number;
  creator: string;
  dateCreated: number;
  desiredAvailable: number;
  doneDate: number;
  downloadDir: string;
  downloadedEver: number;
  downloadLimit: number;
  downloadLimited: boolean;
  error: number;
  errorString: string;
  eta: number;
  etaIdle: number;
  files: Files[];
  fileStats: FileStats[];
  hashString: string;
  haveUnchecked: number;
  haveValid: number;
  honorsSessionLimits: boolean;
  id: number;
  isFinished: boolean;
  isPrivate: boolean;
  isStalled: boolean;
  leftUntilDone: number;
  magnetLink: string;
  manualAnnounceTime: number;
  maxConnectedPeers: number;
  metadataPercentComplete: number;
  name: string;
  'peer-limit': number;
  peers: any[];
  peersConnected: number;
  peersFrom: PeersFrom;
  peersGettingFromUs: number;
  peersSendingToUs: number;
  percentDone: number;
  pieces: string;
  pieceCount: number;
  pieceSize: number;
  priorities: number[];
  rateDownload: number;
  rateUpload: number;
  recheckProgress: string;
  seedIdleLimit: number;
  seedIdleMode: string;
  seedRatioLimit: number;
  seedRatioMode: string;
  sizeWhenDone: number;
  startDate: string;
  status: string;
  trackers: Trackers[];
  trackerStats: TrackerStats[];
  totalSize: number;
  torrentFile: string;
  uploadedEver: number;
  uploadLimit: number;
  uploadLimited: string;
  uploadRatio: number;
  wanted: number[];
  webseeds: any[];
  webseedsSendingToUs: number;
}

export interface PeersFrom {
  fromCache: number;
  fromDht: number;
  fromIncoming: number;
  fromLpd: number;
  fromLtep: number;
  fromPex: number;
  fromTracker: number;
}

export interface Trackers {
  announce: string;
  id: number;
  scrape: string;
  tier: number;
}

export interface TrackerStats {
  announce: string;
  announceState: number;
  downloadCount: number;
  hasAnnounced: boolean;
  hasScraped: boolean;
  host: string;
  id: number;
  isBackup: boolean;
  lastAnnouncePeerCount: number;
  lastAnnounceResult: string;
  lastAnnounceStartTime: number;
  lastAnnounceSucceeded: boolean;
  lastAnnounceTime: number;
  lastAnnounceTimedOut: boolean;
  lastScrapeResult: string;
  lastScrapeStartTime: number;
  lastScrapeSucceeded: boolean;
  lastScrapeTime: number;
  lastScrapeTimedOut: number;
  leecherCount: number;
  nextAnnounceTime: number;
  nextScrapeTime: number;
  scrape: string;
  scrapeState: number;
  seederCount: number;
  tier: number;
}

export interface FileStats {
  bytesCompleted: number;
  priority: number;
  wanted: boolean;
}

export interface Files {
  bytesCompleted: number;
  length: number;
  name: string;
}
