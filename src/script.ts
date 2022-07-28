import Reload from './comps/Reload'
import Generator from './comps/Generator'
import Gameplay from './comps/Gameplay'

new Reload()
const generator = new Generator({ size: 9 })
const tab = generator.tab

new Gameplay({ tab })
