import { rawHtmlToBlocks, renderFromRawBlocks } from './blocksToContent';
describe('rawHtmlToBlocks', () => {
  it('parses a block', () => {
    const input = `<!-- wp:columns {"columns":3} -->
        <div class="wp-block-columns has-3-columns"><!-- wp:column -->
        <div class="wp-block-column"><!-- wp:paragraph -->
        <p>Left</p>
        <!-- /wp:paragraph --></div>
        <!-- /wp:column -->`;
    const output = rawHtmlToBlocks(input);
    expect(output.length).toEqual(1);
    expect(output[0].blockName).toEqual('core/columns');
  });
  it('parses several blocks', () => {
    const input = `<!-- wp:paragraph -->
        <p>aaaaa</p><!-- /wp:paragraph --><!-- wp:paragraph -->
        <p>d</p><!-- /wp:paragraph --><!-- wp:quote -->
        <blockquote class="wp-block-quote"><p>aaaaaaaaaaaaaaaaaaaaaaa</p><cite>a</cite></blockquote>
        <!-- /wp:quote -->`;
    const output = rawHtmlToBlocks(input);
    expect(output.length).toEqual(3);
    expect(output[2].blockName).toEqual('core/quote');
  });
});

describe('renderFromRawBlocks', () => {
  it('Renders to string', () => {
    const input = `<!-- wp:paragraph --><p>P1</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>P2</p><!-- /wp:paragraph -->`;
    const output = renderFromRawBlocks(input);
    expect(output).toEqual('<p>P1</p><p>P2</p>');
  });

  it('Renders empty string if given an empty string', () => {
    const input = ``;
    const output = renderFromRawBlocks(input);
    expect(output).toEqual('');
  });

  it('Renders same string if given No blocks in string', () => {
    const input = `<div>Hi Roy</div>`;
    const output = renderFromRawBlocks(input);
    expect(output).toEqual(`<div>Hi Roy</div>`);
  });
});
