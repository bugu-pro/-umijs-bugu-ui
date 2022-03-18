import { dirname, join } from "path";
import { readFileSync } from "fs";
import { IApi, utils } from "umi";

export default (api: IApi) => {
  api.modifyBabelPresetOpts((opts) => {
    // babel-import
    const imps = [
      {
        libraryName: "@bugu/ui-components",
        camel2DashComponentName: false,
        style: true,
      },
    ];

    return {
      ...opts,
      import: (opts.import || []).concat(imps),
    };
  });

  // make sure antd is installed.
  api.addDepInfo(() => {
    function getAntdDependency() {
      const { dependencies, devDependencies } = api.pkg;
      return (
        dependencies?.antd ||
        devDependencies?.antd ||
        require("../package").dependencies.antd
      );
    }

    return {
      name: "antd",
      range: getAntdDependency(),
    };
  });
};
