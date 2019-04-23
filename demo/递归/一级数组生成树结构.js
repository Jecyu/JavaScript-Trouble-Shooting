// 数组的对象格式
const res = [
  { id: 1, parentId: -1, label: "一级 1" },
  { id: 2, parentId: 1, label: "二级 1-1" },
  { id: 3, parentId: 2, label: "三级 1-1-1" },
  { id: 4, parentId: -1, label: "一级 2" },
  { id: 5, parentId: 4, label: "二级 2-1" },
  { id: 6, parentId: 5, label: "三级 2-1-1" },
  { id: 7, parentId: -1, label: "一级 3" },
  { id: 8, parentId: 7, label: "二级 3-1" },
  { id: 9, parentId: 8, label: "三级 3-1-1" },
  { id: 10, parentId: 7, label: "二级 3-2" },
  { id: 11, parentId: 8, label: "三级 3-2-1" },
  { id: 12, parentId: 3, label: "四级 1-1-1-1" }
];

// 转为树的形式
const tree = [
  {
    label: "一级 1",
    children: [
      {
        label: "二级 1-1",
        children: [
          {
            label: "三级 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 2",
    children: [
      {
        label: "二级 2-1",
        children: [
          {
            label: "三级 2-1-1"
          }
        ]
      },
      {
        label: "二级 2-2",
        children: [
          {
            label: "三级 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 3",
    children: [
      {
        label: "二级 3-1",
        children: [
          {
            label: "三级 3-1-1"
          }
        ]
      },
      {
        label: "二级 3-2",
        children: [
          {
            label: "三级 3-2-1"
          }
        ]
      }
    ]
  }
];

// 一. 嵌套循环法
//  由于是对象的形式，改变子级的同时，也更新了父对象的值
function getTreeByLooNest(data) {
  const tree = [];
  data.forEach(node => {
    if (node.parentId === -1) {
      tree.push(node);
    }
    node.children = [];
    data.forEach(nodeChild => {
      if (nodeChild.parentId === node.id) {
        node.children.push(nodeChild);
      }
    });
  });
  return tree;
}

// 二、两层循环，添加多一个数组，记录父级
function getTreeByTwoLoop() {
  const n = []; // 添加多一个数组，记录父级
  const treeMap = {};
  tree.forEach(node => (treeMap[node.id] = node));
  tree.forEach(node => {
    if (node.parentId === -1) {
      n.push(node);
    }
    const parent = treeMap[node.parentId];
    if (parent) {
      const children = parent.children || [];
      children.push(node);
      parent.children = children;
    }
  });
}

// 三、一层循环
function getTreeByOneLoop(tree) {
  const n = [];
  tree.forEach((node, idx, tree) => {
    if (node.parentId === -1) {
      n.push(node);
    }
    const parent = tree[tree.findIndex(v => v.id === node.parentId)];
    if (parent) {
      const children = parent.children || [];
      children.push(node);
      parent.children = children;
    }
  });
  return tree;
}

// TODO 扁平化树
// 分析，如果带有树
// 1. 最终效果： flatTree(data)，传入树数据对象，返回扁平化的一级数组，并且带有父子id，如果是一级则父 id 为 -1
// id, parentId 不能相同
// 2. 递归关系 flatTree(data)
// 3. 出口条件 children.length === 0
function flatTree(tree) {
  const arr = [];
  const obj = {};
  // if (node.children.length > 0) {
  //   flatTree();
  // }
  obj.label = node.label;
  arr.push(obj);
}

function getflatTreeByCursive(tree) {
  // const flatArray = [];
  // tree.forEach(node => {
  //   flatArray = [...flatTree(node), ...flatArray];
  // });
  // return flatArray;
}
