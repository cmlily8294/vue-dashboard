/**
 * 后端接口api地址
 */

let base = '/opmp/v1';


export const baseUrl = base;

//登录API
export const login = base + '/login';

export const loginout = base + '/loginout';

export const updatePassWord = base +'/update-password';

//合同模版列表api
export const contractTempList = base + '/agr-templates?trans=1';

//合同模板添加api
export const contractTemp = base + '/agr-template';

//查看合同模板详情
export const contractTemView = base + '/agr-template/';

//合同模板修改
export const contractTemModify = base + '/agr-template/';

//合同模板审批
export const contractTemAudit = base + '/agr-template-apr/';

//订单列表api
export const ordersList = base + '/orders?trans=1';

//订单财务审核
export const ordersAudit = base + '/pay-approve/';

//订单审核提示信息
export const capion = base + '/pay_check/';

//订单详情api
export const order = base + '/order/';

//合同列表api
export const contractList = base + '/agr-infos?trans=1';

//合同详情api
export const contractView = base + '/agr-info/';
//邮寄信息添加
export const postRecord = base + '/agr-mail';

//托管机构列表
export const trusteeList = base + '/partner/trustee/list?trans=1';
//托管机构添加
export const trusteeCreate = base + '/partner/trustee/create';
//托管机构查看
export const trusteeView = base + '/partner/trustee/view';
//托管机构更新
export const trusteeModify = base + '/partner/trustee/modify';
//托管机构审核
export const trusteeAudit = base + '/partner/trustee/audit';
//托管机构唯一校验
export const trusteeAjaxVerify = base + '/partner/trustee/ajaxVerify';

//基金管理机构列表
export const fundManagerList = base + '/partner/fundManager/list?trans=1';
//基金管理机构添加
export const fundManagerCreate = base + '/partner/fundManager/create';
//基金管理机构查看
export const fundManagerView = base + '/partner/fundManager/view';
//基金管理机构更新
export const fundManagerModify = base + '/partner/fundManager/modify';
//基金管理机构审核
export const fundManagerAudit = base + '/partner/fundManager/audit';
//基金管理机构唯一校验
export const fundManagerAjaxVerify = base + '/partner/fundManager/ajaxVerify?trans=2';
//基金管理机构查询接口
export const fundManagerListByName = base + '/partner/fundManager/ListByName';

//产品列表
export const productsList = base + '/products?trans=1';


//规则列表
export const rulesList = base + '/get-rules?trans=1';

//规则新增
export const rulesCreate = base + '/add-rule';

//规则详情
export const rulesView = base + '/get-rule/';

//规则更细
export const rulesModify = base + '/update-rule/';

//回收合同
export const contractRecycle = base + '/agr-recycle';
//通过合同模版名称模糊查询
export const agreementByName = base + '/agr-id';
//获取盖章合同章路径
export const signUrl = base + '/sign-url';


//产品添加
export const product = base + '/product/';
//产品发布
export const productRelease = base + '/product/release-notice/';
//产品成立
export const productReset = base + '/product/reset-product/';
//产品流标
export const productFlow = base + '/product/flow-standard/';
//产品审核
export const productAudit = base + '/product/audit/';
//获取产品审批记录
export const productAuditList = base + '/product_approve';

//文件上传api
export const upload = base + '/upload';

//托管机构查询api
export const trusteeListByName = base + '/partner/trustee/ListByName';

//投资人列表
export const investorList = base + '/confirm-orders/';

//合同审核
export const contractAudit = base + '/agr-audit';

//项目联动规则
export const getRules = base + '/get-rules';
//查看活期、定期利息表
export const interest = base + '/benefits/cluster';

//获取利息、人数
export const revenue = base + '/revenue-summary';

//活期、定期利息表下载
export const download =  base + '/download-cluster?';

//初级财务审核接口
export const firstAudit = base + '/junior-audit';

//修改活期利息
export const modifyInterest = base + '/modify-interest';

//获取投资经理
export const getInvestmentManager = base + '/fund/investment-managers/';

//修改利率
export const modifyApr = base + '/change-current';

//审核按钮状态
export const btnShow = base + '/benefit-exist';

//复审
export const secondAudit = base + '/confirm-payment';

//合同历史版本
export const historyAgreement = base + '/history-agreement';

//定期利息为0的条数
export const getPrivateInterestTotal = base + '/interest-order?';

//订单下载
export const downloadOrderList = base + '/excel/download?';

//订单导入
export const uploadUrl = base + '/upload-line';

//订单导入检测
export const uploadCheck = base + '/deal-orders';

//封账功能
export const sealingAccount = base + '/product/sealing-account/';

//下限订单审核
export const offlineAudit = base + '/offline-approve/';

//线下订单更新
export const offlineUpdate = base + '/update-offline/';

//银行列表
export const bankList = base + '/bank-name';

//获取银行相关信息
export const bankInfo = base + '/refund-bank?';