import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

compileUiExtensions({
    outputPath: path.join(__dirname, '../admin-ui'),
    extensions: [
        /* ... */
    ],
})
    .compile?.()
    .then(() => {
        process.exit(0);
    });