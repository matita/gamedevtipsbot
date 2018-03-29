require('dotenv').config()

require('./features/server')
require('./features/discord')

require('./sources/twitter')
require('./sources/patreon/users/saint11')
require('./sources/web/unitytip')

// fix db images not in cdn
require('./exec/upload-cdn')