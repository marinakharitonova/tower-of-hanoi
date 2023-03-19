export const MIN_DISKS_COUNT = 3;
export const MAX_DISKS_COUNT = 8;

export type DiskType = {
    color: string,
    size: number
}

export type State = {
    towers: Array<DiskType[]>
    disksCount: number
    movesCount: number
    isWin: boolean
}

export enum ActionKind {
    MovedDisk = 'moved_disk',
    ChangedDisksCount = 'changed_disks_count',
    IncreasedMovesCount = 'increased_moves_count',
    SetVictory = 'set_victory',
    RestartedGame = 'restarted_game'
}

type MovedDiskAction = {
    type: ActionKind.MovedDisk
    payload: {
        towerId: number,
        disk: DiskType
    }
}

type ChangedDisksCountAction = {
    type: ActionKind.ChangedDisksCount
    payload: {
        disksCount: number
    }
}

type NoPayloadAction = {
    type: ActionKind.IncreasedMovesCount | ActionKind.SetVictory | ActionKind.RestartedGame
}

export type Action = MovedDiskAction | ChangedDisksCountAction | NoPayloadAction

export const initialState: State = {
    towers: [],
    disksCount: 3,
    movesCount: 0,
    isWin: false
}

/** Possible colors for tower's disks */
const colors = ['#03fc77', '#a903fc', '#fc0352', '#dde868', '#db5d27', '#2772db', '#f58c8c', '#8ca5f5']

/** Returns a tower of given size filled with disks */
const createTower = (size: number): DiskType[] => {
    const tower = [] as DiskType[]
    for (let i = 0; i < size; i++) {
        tower.push({color: colors[i], size: i})
    }
    return tower
}

export const createInitialState = (): State => {
    const firstTower = createTower(initialState.disksCount)

    return {
        ...initialState,
        towers: [firstTower, [], []]
    }
}

export const appReducer = (state: State, action: Action) => {
    switch (action.type) {
        /** Move disk from current tower to tower with given id */
        case ActionKind.MovedDisk: {
            const {disk, towerId} = action.payload
            const nextTowers = state.towers.map(tower => tower.filter(d => d.size !== disk.size))
            nextTowers[towerId] = [
                disk,
                ...nextTowers[towerId]
            ]
            return {
                ...state,
                towers: nextTowers
            };
        }

        /** Changes the number of disks in the initial tower */
        case ActionKind.ChangedDisksCount: {
            const {disksCount} = action.payload
            const tower = createTower(disksCount)
            return {
                ...state,
                disksCount: disksCount,
                towers: [tower, [], []]
            }
        }

        /** Increases the number of moves in the game */
        case ActionKind.IncreasedMovesCount: {
            return {
                ...state,
                movesCount: state.movesCount + 1
            }
        }

        /** Sets victory in the game */
        case ActionKind.SetVictory: {
            return {
                ...state,
                isWin: true
            }
        }

        /** Start new game */
        case ActionKind.RestartedGame: {
            return {
                ...state,
                towers: [createTower(state.disksCount), [], []],
                isWin: false,
                movesCount: 0
            }
        }
    }
}