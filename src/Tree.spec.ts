import * as test from "tape";

import {Tree} from "./Tree";

test('Tree', (t: test.Test) => {

    t.test('creates a new Tree instance', (t: test.Test) => {
        const treeInstance = new Tree<string>();

        t.assert(treeInstance !== undefined, 'instance exists');
        t.end();
    });

    t.test('creates a new Tree instance with the passed in data', (t: test.Test) => {
        const treeInstance = new Tree<string>('test');

        t.assert(treeInstance !== undefined, 'instance exists');
        t.equal(treeInstance.getNodeData(), 'test');
        t.end();
    });

    t.test('getNodeData', (t: test.Test) => {
        const treeInstance = new Tree<number>(10);

        t.test('retrieves the current value of node data', (t: test.Test) => {
            t.equal(treeInstance.getNodeData(), 10);
            t.end();
        });
    });

    t.test('setNodeData', (t: test.Test) => {
        const treeInstance = new Tree<number>();

        t.test('sets the node data', (t: test.Test) => {
            treeInstance.setNodeData(1);

            t.equal(treeInstance.getNodeData(), 1);
            t.end();
        });
    });

    t.test('addChild', (t: test.Test) => {
        const treeInstance = new Tree<Object>();

        t.test('adds a child to the children list', (t: test.Test) => {
            treeInstance.addChild({ test: 'foo' });

            t.deepEquals(treeInstance.getChildAt(0).getNodeData(), { test: 'foo' });
            t.end();
        });
    });

    t.test('getChildAt', (t: test.Test) => {
        const treeInstance = new Tree<string>('root');

        t.test('gets a child at a valid location', (t: test.Test) => {
            treeInstance.addChild('l1c1');

            t.equals(treeInstance.getChildAt(0).getNodeData(), 'l1c1');
            t.end();
        });

        t.test('gracefully handles invalid indices', (t: test.Test) => {
            t.equals(treeInstance.getChildAt(1), undefined);
            t.end();
        });
    });

    t.test('removeChild', (t: test.Test) => {
        function setup() {
            const t = new Tree<number>(0);

            t.addChild(1);
            t.addChild(2);
            t.addChild(3);

            return t;
        }

        t.test('removes and returns child at given index', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(1);

            t.assert(removedChild !== undefined, 'exists');
            t.assert(removedChild instanceof Tree, 'is a tree');
            t.equal(removedChild.getNodeData(), 2);
            t.end();
        });

        t.test('handles invalid indices gracefully', (t: test.Test) => {
            const treeInstance = setup();
            const removedChild = treeInstance.removeChild(45);

            t.equal(removedChild, undefined);
            t.end();
        });
    });

    t.test('clone', (t: test.Test) => {

        t.test('clones a single node', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            const cloneTree = treeInstance.clone();

            t.assert(cloneTree instanceof Tree, 'should be a tree');
            t.equal(treeInstance.getNodeData(), cloneTree.getNodeData());
            t.end();
        });

        t.test('clones a tree with children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2);
            const cloneTree = treeInstance.clone();

            t.assert(cloneTree instanceof Tree, 'should be a tree');
            t.equal(treeInstance.getNodeData(), cloneTree.getNodeData());
            t.equal(treeInstance.getChildAt(0).getNodeData(), cloneTree.getChildAt(0).getNodeData());
            t.equal(treeInstance.getChildAt(1).getNodeData(), cloneTree.getChildAt(1).getNodeData());
            t.end();
        });
    });

    t.test('size', (t: test.Test) => {
        t.test('returns 1 for a tree with one node', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);

            t.equal(treeInstance.size(), 1);
            t.end();
        });

        t.test('returns 3 for a tree with one node and two children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);

            treeInstance.addChild(1);
            treeInstance.addChild(2);

            t.equal(treeInstance.size(), 3);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            const firstChild = treeInstance.getChildAt(0);

            firstChild.addChild(3);
            firstChild.addChild(4);
            treeInstance.addChild(2);

            t.equal(treeInstance.size(), 5);
            t.end();
        });
    });

    t.test('height', (t: test.Test) => {
        t.test('handles a tree with a single node correctly', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);

            t.equal(treeInstance.height(), 1);
            t.end();
        });

        t.test('handles a tree with multiple children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2);

            t.equal(treeInstance.height(), 2);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2);

            const firstChild = treeInstance.getChildAt(0);
            firstChild.addChild(3);
            firstChild.addChild(4);

            const secondChild = treeInstance.getChildAt(1);
            secondChild.addChild(5);
            secondChild.addChild(6);

            const fifthChild = secondChild.getChildAt(0);
            fifthChild.addChild(7);

            t.equal(treeInstance.height(), 4);
            t.end();
        });
    });

    t.test('numChildren', (t: test.Test) => {
        t.test('handles a tree with a single node correctly', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);

            t.equal(treeInstance.numChildren(), 0);
            t.end();
        });

        t.test('handles a tree with multiple children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2);

            t.equal(treeInstance.numChildren(), 2);
            t.end();
        });

        t.test('handles trees with asymmetric children', (t: test.Test) => {
            const treeInstance = new Tree<number>(0);
            treeInstance.addChild(1);
            treeInstance.addChild(2);
            treeInstance.addChild(3);

            const firstChild = treeInstance.getChildAt(0);
            firstChild.addChild(4);
            firstChild.addChild(5);

            const secondChild = treeInstance.getChildAt(1);
            secondChild.addChild(6);
            secondChild.addChild(7);

            const fifthChild = secondChild.getChildAt(0);
            fifthChild.addChild(8);

            t.equal(treeInstance.numChildren(), 3);
            t.end();
        });
    });
});
