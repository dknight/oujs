let Ou = new __Ou__();

describe('OuJS', () => {
  it ('should get null for getting no existing element', () => {
    expect(Ou.g('notexisting')).toBeNull();
  });
  it ('should get an element', () => {
   expect(typeof Ou.g('#testme')).toEqual('object');
  });
  it ('should get 0 for no existing elements', () => {
    expect(Ou.gal('div.hellworld').length).toBe(0);
  });
  it ('should get number of list items', () => {
    expect(Ou.gal('#boo-list li').length).toBe(3);
  });

  it ('should get attribute id of the list', () => {
    expect(Ou.g('#boo-list').gatr('id')).toEqual('boo-list');
  });
  it ('should have attribute data-test', () => {
    expect(Ou.g('body').hatr('data-test')).toBe(true);
  });
  it ('should not have attribute lang', () => {
    expect(Ou.g('body').hatr('lang')).toBe(false);
  });
  it ('should not have id attribute after remove attribute', () => {
    Ou.g('#testme').ratr('id');
    expect(Ou.g('ins').gatr('id')).toBeNull();
  });

  it ('should toggle class name and check new class name exists', () => {
    Ou.g('.test-element').tcls('test-element-new')
    expect(Ou.g('.test-element').hcls('test-element-new')).toBe(true);
  });
  it ('should remove class name and check new class name doesnt exists', () => {
    Ou.g('.test-element').rcls('test-element-new')
    expect(Ou.g('.test-element').hcls('test-element-new')).toBe(false);
  });

  it ('should add classes farm & cow and check theirs existance', () => {
    Ou.g('.test-element').acls('farm', 'cow');
    expect(Ou.g('.test-element').hcls('farm')).toBe(true);
    expect(Ou.g('.test-element').hcls('cow')).toBe(true);
  });
});