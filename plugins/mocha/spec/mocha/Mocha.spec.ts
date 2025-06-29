
import { expect } from 'chai';

describe('Fuse Mocha Test Plugin', () => {
    it('should return success to native', () => {
        expect(true).to.equal(true);
    });

    it('should return failure to native', () => {
        expect(true).to.equal(false);
    });
});
