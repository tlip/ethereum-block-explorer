import React from 'react';

import Header from '../../../../common/Header';
import HeaderField from '../../../../common/HeaderField';

const ExplorerHeaderPlaceholder = () => (
  <Header>
    <HeaderField title="CURRENT BLOCK" loading />
    <HeaderField title="AVERAGE GAS PRICE" loading />
    <HeaderField title="AVERAGE BLOCK SIZE" loading />
    <HeaderField title="AVERAGE BLOCK FULLNESS" loading />
  </Header>
);

export default ExplorerHeaderPlaceholder;
