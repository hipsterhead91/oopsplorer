import { Link } from "react-router-dom";

// ВНИМАНИЕ: все функции ниже редактируют только отображение информации в компоненте DataGrid, но не меняют сами
// исходные данные. Это важно в том числе потому, что сортировка таблицы происходит по "невидимым" исходным
// данным, а не по отрендеренным значениям, так что форматирование сугубо косметическое.

// ПРИМЕЧАНИЕ: "форматтеры" используются, когда нужно произвести несложные преобразования исходного значения,
// например добавить символ процента/валюты, привести число к строке или наоборот. Если же на основании исходного
// значения нужно вернуть какой-то более сложный html, используются "рендереры".

// НА ЗАМЕТКУ: полная информация об объекте хранится в params.data, а в params.value дублируется то его свойство,
// которое рендерится в конкретно взятой ячейке (своеобразный шорткат). То есть, для ячейки с моникером в params.value
// будет храниться моникер, но также к нему можно получить доступ через params.data.description.moniker - это
// пригодится, например, если я захочу в ячейке с моникером также рендерить и аватар, или в ячейке со стейком - вес голоса.

// РЕНДЕР МОНИКЕРА
function monikerRenderer(params) {
  const chainPath = params.data.chain.name + '-' + params.data.chain.chain;
  return <Link to={`/${chainPath}/${params.data.operator_address}`} state={params.data}>{params.value}</Link>
}

// ФОРМАТИРОВАНИЕ ГОЛОСА
function votingPowerFormatter(params) {
  const result = Number.isNaN(params.value) ? '. . .' : params.value.toFixed(2) + '%';
  return result;
};

// РЕНДЕР СТЕЙКА
function stakeRenderer(params) {
  return <span>{params.value} <span style={{ color: '#999999' }}>EVMOS</span></span>;
};

// ФОРМАТИРОВАНИЕ КОМИССИИ
function commissionFormatter(params) {
  return params.value + '%';
};

// РЕНДЕР СТАТУСА
function statusRenderer(params) {
  if (params.value === 'Unbonded') { return <span style={{ color: '#999999' }}>{params.value}</span> }
  else if (params.value === 'Unbonding') { return <span style={{ color: '#cc9900' }}>{params.value}</span> }
}

// РЕНДЕР ТЮРЬМЫ
function jailRenderer(params) {
  return <span style={{ color: '#ab1100' }}>{params.value}</span>
}

// АКТИВНЫЙ СЕТ, НАСТРОЙКИ ОТОБРАЖЕНИЯ КОЛОНОК
export const activeColumnDefs = [
  {
    field: 'rank',
    headerName: '#',
    sortable: true,
    // maxWidth: '60'
  },
  {
    field: 'description.moniker',
    headerName: 'Moniker',
    cellRenderer: monikerRenderer,
  },
  {
    field: 'voting_power',
    headerName: 'Voting Power',
    valueFormatter: votingPowerFormatter,
    type: 'numericColumn',
    sortable: true,
    // maxWidth: '200'
  },
  {
    field: 'tokens_num',
    headerName: 'Stake',
    cellRenderer: stakeRenderer,
    type: 'numericColumn',
    sortable: true,
    // maxWidth: '200'
  },
  {
    field: 'commission_num',
    headerName: 'Commission',
    valueFormatter: commissionFormatter,
    sortable: true,
    type: 'numericColumn',
    // maxWidth: '140'
  }
];

// НЕАКТИВНЫЙ СЕТ, НАСТРОЙКИ ОТОБРАЖЕНИЯ КОЛОНОК
export const inactiveColumnDefs = [
  {
    field: 'rank',
    headerName: '#',
    sortable: true,
    maxWidth: '60'
  },
  {
    field: 'description.moniker',
    headerName: 'Moniker',
    cellRenderer: monikerRenderer,
  },
  {
    field: 'voting_power',
    headerName: 'Voting Power',
    valueFormatter: votingPowerFormatter,
    type: 'numericColumn',
    sortable: true,
    maxWidth: '120'
  },
  {
    field: 'tokens_num',
    headerName: 'Stake',
    cellRenderer: stakeRenderer,
    type: 'numericColumn',
    sortable: true,
    maxWidth: '200'
  },
  {
    field: 'commission_num',
    headerName: 'Commission',
    valueFormatter: commissionFormatter,
    sortable: true,
    type: 'numericColumn',
    maxWidth: '140'
  },
  {
    field: 'status_short',
    headerName: 'Bond Status',
    cellRenderer: statusRenderer,
    sortable: true,
    type: 'rightAligned',
    maxWidth: '140'
  },
  {
    field: 'jailed_str',
    headerName: 'Jail',
    cellRenderer: jailRenderer,
    sortable: true,
    type: 'rightAligned',
    minWidth: 100, maxWidth: 100,
    maxWidth: '100'
  }
];