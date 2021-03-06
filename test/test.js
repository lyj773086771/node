var assert = require('assert');

/**
 * describe 测试套件test suite 标识一组相关的测试
 * it 测试用例 test case 标识一个单独的测试
 * assert 断言 表示对结果的预期
 */

 describe('Array', function(){
     describe('#indexOf()', function(){
         it('should return -1 when the value is not present', function(){
             assert.equal(-1, [1, 2, 3].indexOf(4));
         })

         it('length', function(){
             assert.equal(3, [1,2,3].length);
         })
     })
 })