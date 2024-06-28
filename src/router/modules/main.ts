const Layout = () => import('@/layout/index.vue');
// '政治', '思想', '组织', '记录', '工团', '文化'
export default [
  {
    path: '/politics',
    redirect: '/politics/index',
    component: Layout,
    meta: { more: true, title: '政治', rank: 1 },
    children: [
      {
        name: 'Politics',
        path: 'index',
        component: () => import('@/views/politics/index.vue'),
        meta: {
          title: '政治建设',
          icon: ''
        }
      },
      {
        name: 'Detail',
        path: 'pages/detail',
        component: () => import('@/views/politics/pages/detail.vue'),
        meta: {
          title: '详情',
          icon: ''
        }
      },
      {
        name: 'Execute',
        path: 'pages/execute',
        component: () => import('@/views/politics/pages/execute.vue'),
        meta: {
          title: '详情',
          icon: ''
        }
      },
      {
        name: 'TopicSys',
        path: 'topicSys',
        component: 'ParentView',
        meta: {
          title: '第一议题制度',
          icon: 'politics_firstSys'
        },
        children: [
          {
            name: 'Basic',
            path: 'basic',
            component: 'politics/topicSys/index',
            meta: {
              title: '基层上报',
              icon: '#'
            }
          },
          {
            name: 'Audit',
            path: 'audit',
            component: 'politics/topicSys/audit',
            meta: {
              title: '审核申报',
              icon: ''
            }
          },
          {
            name: 'Statistics',
            path: 'statistics',
            component: 'politics/topicSys/statistics',
            meta: {
              title: '统计分析',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Index',
        path: 'index',

        component: 'politics',
        meta: {
          title: '主界面',
          icon: '#'
        }
      },
      {
        name: 'Decision',
        path: 'decision',
        component: 'ParentView',
        meta: {
          title: '党委议事决策',
          icon: 'naviegggl'
        },
        children: [
          {
            name: 'DmInformationGroup',
            path: 'dmInformationGroup',
            component: 'politics/decision/dmInformation/indexGroup',
            meta: {
              title: '信息看板（集团）',
              icon: '#'
            }
          },
          {
            name: 'DmInstitution',
            path: 'dmInstitution',
            component: 'politics/decision/dmInstitution/index',
            meta: {
              title: '制度管理',
              icon: '#'
            }
          },
          {
            name: 'DmInstitutionView',
            path: 'dmInstitutionView',
            component: 'politics/decision/dmInstitution/dmInstitutionView',
            meta: {
              title: '制度查阅',
              icon: '#'
            }
          },
          {
            name: 'PreItem',
            path: 'preItem',
            component: 'politics/decision/preItem/index',
            meta: {
              title: '前置事项',
              icon: '#'
            }
          },
          {
            name: 'PreItemGroup',
            path: 'preItemGroup',
            component: 'politics/decision/preItem/indexGroup',
            meta: {
              title: '前置事项（集团）',
              icon: '#'
            }
          },
          {
            name: 'DmTopics',
            path: 'dmTopics',
            component: 'politics/decision/dmTopics/index',
            meta: {
              title: '议题清单',
              icon: '#'
            }
          },
          {
            name: 'DmTopicsGroup',
            path: 'dmTopicsGroup',
            component: 'politics/decision/dmTopics/indexGroup',
            meta: {
              title: '议题清单（集团）',
              icon: '#'
            }
          },
          {
            name: 'DmMeeting',
            path: 'dmMeeting',
            component: 'politics/decision/dmMeeting/index',
            meta: {
              title: '会议清单',
              icon: '#'
            }
          },
          {
            name: 'DmMeetingGroup',
            path: 'dmMeetingGroup',
            component: 'politics/decision/dmMeeting/indexGroup',
            meta: {
              title: '会议清单（集团）',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'WorkSupervise',
        path: 'workSupervise',
        component: 'ParentView',
        meta: {
          title: '重点工作督办',
          icon: 'politics_workSup'
        },
        children: [
          {
            name: 'Manage',
            path: 'manage',
            component: 'politics/workSupervise/manage/index',
            meta: {
              title: '督办事项列表',
              icon: '#'
            }
          },
          {
            name: 'Jc',
            path: 'jc',
            component: 'politics/workSupervise/jc/jcList',
            meta: {
              title: '重点工作反馈',
              icon: '#'
            }
          },
          {
            name: 'Check',
            path: 'check',

            component: 'politics/workSupervise/check/checkList',
            meta: {
              title: '督办情况审核',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Patrol',
        path: 'patrol',
        component: 'ParentView',
        meta: {
          title: '巡视巡察',
          icon: 'politics_patorl'
        },
        children: [
          {
            name: 'Rectify',
            path: 'rectify',
            component: 'public/content/index',
            meta: {
              title: '落实巡视整改',
              icon: '#'
            }
          },
          {
            name: 'Party',
            path: 'party',
            component: 'ParentView',
            meta: {
              title: '集团党委巡察',
              icon: '#'
            },
            children: [
              {
                name: 'PatrolInst',
                path: 'patrolInst',
                component: 'public/content/index',
                meta: {
                  title: '巡察制度',
                  icon: '#'
                }
              },
              {
                name: 'PatrolDynamic',
                path: 'patrolDynamic',
                component: 'public/content/index',
                meta: {
                  title: '巡察动态',
                  icon: '#'
                }
              },
              {
                name: 'PatrolNotice',
                path: 'patrolNotice',
                component: 'public/content/index',
                meta: {
                  title: '巡察公告',
                  icon: '#'
                }
              },
              {
                name: 'Notification',
                path: 'notification',
                component: 'politics/patrol/party/notification/index',
                meta: {
                  title: '巡察反馈',
                  icon: '#'
                }
              },
              {
                name: 'Reform',
                path: 'reform',
                component: 'politics/patrol/party/reform/index',
                meta: {
                  title: '巡察整改',
                  icon: '#'
                }
              },
              {
                name: 'RefotmAudit',
                path: 'refotmAudit',
                component: 'politics/patrol/party/reformAudit',
                meta: {
                  title: '巡察整改（集团）',
                  icon: '#'
                }
              },
              {
                name: 'Result',
                path: 'result',
                component: 'politics/patrol/party/result/index',
                meta: {
                  title: '成果运用',
                  icon: '#'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/think',
    redirect: '/think/index',
    meta: { more: true, title: '思想', rank: 2 },
    component: Layout,
    children: [
      {
        name: 'Think',
        path: 'index',
        component: () => import('@/views/think/index.vue'),
        meta: {
          title: '思想建设',
          icon: ''
        }
      },
      {
        name: 'Index',
        path: 'index',

        component: 'think',
        meta: {
          title: '主界面',
          icon: '#'
        }
      },
      {
        name: 'StudyCenter',
        path: 'studyCenter',
        component: 'ParentView',
        meta: {
          title: '中心组学习',
          icon: 'think_studyCentre'
        },
        children: [
          {
            name: 'StudyPlan',
            path: 'studyPlan',
            component: 'think/studyPlan/index',
            meta: {
              title: '学习计划',
              icon: '#'
            }
          },
          {
            name: 'StudyRecord',
            path: 'studyRecord',
            component: 'think/studyRecord/index',
            meta: {
              title: '学习记录',
              icon: '#'
            }
          },
          {
            name: 'StudyPoints',
            path: 'studyPoints',
            component: 'think/studyPoints/index',
            meta: {
              title: '学习总结',
              icon: '#'
            }
          },
          {
            name: 'StatisticalEvaluation',
            path: 'StatisticalEvaluation',
            component: 'think/StatisticalEvaluation/index',
            meta: {
              title: '统计考核',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Theme',
        path: 'theme',
        component: 'ParentView',
        meta: {
          title: '主题教育',
          icon: 'documentation'
        },
        children: [
          {
            name: 'ThemeEdu',
            path: 'ThemeEdu',
            component: 'think/theme/themeEdu/index',
            meta: {
              title: '主题教育',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Advanced',
        path: 'advanced',
        component: 'ParentView',
        meta: {
          title: '先进典型引领',
          icon: 'think_advanced'
        },
        children: [
          {
            name: 'Excellent',
            path: 'excellent',
            component: 'think/advanced/excellent/index',
            meta: {
              title: '两优一先',
              icon: '#'
            }
          },
          {
            name: 'ResultQuery',
            path: 'resultQuery',

            component: 'think/advanced/excellent/index1',
            meta: {
              title: '两优一先结果查询',
              icon: '#'
            }
          },
          {
            name: 'Antecedent',
            path: 'antecedent',

            component: 'think/advanced/antecedent/index',
            meta: {
              title: '两优一先预审',
              icon: '#'
            }
          },
          {
            name: 'Check',
            path: 'check',

            component: 'think/advanced/check/index',
            meta: {
              title: '两优一先审核',
              icon: '#'
            }
          },
          {
            name: 'PartyDeed',
            path: 'partyDeed',
            component: 'public/content/index',
            meta: {
              title: '先锋模范事迹',
              icon: '#'
            }
          },
          {
            name: 'Statistics',
            path: 'statistics',

            component: 'think/advanced/excellent/Statistics',
            meta: {
              title: '历年统计',
              icon: '#'
            }
          },
          {
            name: 'ModelOrg/index1',
            path: 'modelOrg/index1',

            component: 'think/advanced/modelOrg/index1',
            meta: {
              title: '示范党组织预审',
              icon: '#'
            }
          },
          {
            name: 'ModelOrg/index2',
            path: 'modelOrg/index2',

            component: 'think/advanced/modelOrg/index2',
            meta: {
              title: '示范党组织审核',
              icon: '#'
            }
          },
          {
            name: 'Notice',
            path: 'notice',

            component: 'think/advanced/notice/index',
            meta: {
              title: '两优一先评选公告管理',
              icon: '#'
            }
          },
          {
            name: 'Results',
            path: 'results',

            component: 'think/advanced/results/index',
            meta: {
              title: '两优一先获评结果管理',
              icon: '#'
            }
          },
          {
            name: 'ModelOrg',
            path: 'modelOrg',
            component: 'think/advanced/modelOrg/index',
            meta: {
              title: '示范党组织',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'IdeologyDutySystem',
        path: 'ideologyDutySystem',
        component: 'ParentView',
        meta: {
          title: '意识形态责任制',
          icon: 'workGroup_democracy'
        },
        children: [
          {
            name: 'KeyPointWork',
            path: 'keyPointWork',
            component: 'think/keyPointWork/index',
            meta: {
              title: '工作要点',
              icon: '#'
            }
          },
          {
            name: 'ThinkPlanSummary',
            path: 'thinkPlanSummary',
            component: 'think/thinkPlanSummary/index',
            meta: {
              title: '基层上报年度工作总结计划',
              icon: '#'
            }
          },
          {
            name: 'ThinkPlanSummaryView',
            path: 'thinkPlanSummaryView',
            component: 'think/thinkPlanSummary/thinkPlanSummaryView',
            meta: {
              title: '年度工作计划和总结',
              icon: '#'
            }
          },
          {
            name: 'EspMessageBox',
            path: 'espMessageBox',
            component: 'think/espMessageBox/index',
            meta: {
              title: '企情民意气象站',
              icon: '#'
            }
          },
          {
            name: 'EspMessageBoxGroup',
            path: 'espMessageBoxGroup',
            component: 'think/espMessageBox/indexGroup',
            meta: {
              title: ' 企情民意气象站(集团)',
              icon: '#'
            }
          },
          {
            name: 'SurveyList',
            path: 'surveyList',
            component: 'think/survey/view/Manage',
            meta: {
              title: '问卷列表',
              icon: '#'
            }
          },
          {
            name: 'SurveyRecycleBinList',
            path: 'surveyRecycleBinList',
            component: 'think/survey/view/main/SurveyRecycleBinList',
            meta: {
              title: '问卷回收站',
              icon: '#'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/org',
    redirect: '/org/index',
    meta: { more: true, title: '组织', rank: 3 },
    component: Layout,
    children: [
      {
        name: 'Org',
        path: 'index',
        component: () => import('@/views/org/index.vue'),
        meta: {
          title: '组织建设',
          icon: ''
        }
      },
      {
        name: 'Index',
        path: 'index',

        component: 'org',
        meta: {
          title: '主界面',
          icon: '#'
        }
      },
      {
        name: 'AddMeeting',
        path: 'addMeeting',
        component: () => import('@/views/org/pages/addMeeting.vue'),
        meta: {
          title: '新增会议',
          icon: '#'
        }
      },
      {
        name: 'Member',
        path: 'member',
        component: 'ParentView',
        meta: {
          title: '党员管理',
          icon: 'org_member'
        },
        children: [
          {
            name: 'BasicInfo',
            path: 'basicInfo',
            component: 'org/member/basicInfo/index',
            meta: {
              title: '党员基本情况',
              icon: '#'
            }
          },
          {
            name: 'Develop',
            path: 'develop',
            component: 'org/member/develop/index',
            meta: {
              title: '发展党员',
              icon: '#'
            }
          },
          {
            name: 'Audit',
            path: 'audit',
            component: 'org/member/audit/index',
            meta: {
              title: '审核发展阶段',
              icon: '#'
            }
          },
          {
            name: 'Review',
            path: 'review',
            component: 'org/member/review/index',
            meta: {
              title: '民主评议党员（弃用）',
              icon: '#'
            }
          },
          {
            name: 'TDjDeliberation',
            path: 'TDjDeliberation',
            component: 'org/deliberationPartyMember/upload.vue',
            meta: {
              title: '民主评议党员',
              icon: '#'
            }
          },
          {
            name: 'Dues',
            path: 'dues',
            component: 'org/member/dues/index',
            meta: {
              title: '党费收缴情况汇总',
              icon: '#'
            }
          },
          {
            name: 'Turnindues',
            path: 'turnindues',
            component: 'org/member/turnindues/index',
            meta: {
              title: '基层支部上缴党费',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'PartyBuild',
        path: 'partyBuild',
        component: 'ParentView',
        meta: {
          title: '党建工作责任制',
          icon: 'naviewh'
        },
        children: [
          {
            name: 'PartyDivide',
            path: 'PartyDivide',
            component: 'org/partyBuild/partyDivide/index',
            meta: {
              title: '责任分工',
              icon: '#'
            }
          },
          {
            name: 'PartyDivideGroup',
            path: 'PartyDivideGroup',
            component: 'org/partyBuild/partyDivide/indexGroup',
            meta: {
              title: '责任分工（查看）',
              icon: '#'
            }
          },
          {
            name: 'PartyPlanSummary',
            path: 'PartyPlanSummary',
            component: 'org/partyBuild/partyPlanSummary/index',
            meta: {
              title: '计划总结',
              icon: '#'
            }
          },
          {
            name: 'PartyPlanSummaryGroup',
            path: 'PartyPlanSummaryGroup',
            component: 'org/partyBuild/partyPlanSummary/indexGroup',
            meta: {
              title: '计划总结（查看）',
              icon: '#'
            }
          },
          {
            name: 'Party_check',
            path: 'party_check',
            component: 'org/partyBuild/partyCheck/index',
            meta: {
              title: '党建考核',
              icon: ''
            }
          },
          {
            name: 'Party_check_summary',
            path: 'party_check_summary',

            component: 'org/partyBuild/partyCheck/summary',
            meta: {
              title: '党建考核汇总',
              icon: ''
            }
          }
        ]
      },
      {
        name: 'Brand',
        path: 'brand',
        component: 'ParentView',
        meta: {
          title: '党建品牌创建',
          icon: 'org_brand'
        },
        children: [
          {
            name: 'BrandInfo',
            path: 'brandInfo',
            component: 'org/brand/brandInfo/index',
            meta: {
              title: '品牌概况',
              icon: '#'
            }
          },
          {
            name: 'CreateWork',
            path: 'createWork',
            component: 'org/brand/createWork/index',
            meta: {
              title: '创建工作',
              icon: '#'
            }
          },
          {
            name: 'ComparePreAduit',
            path: 'comparePreAduit',

            component: 'org/brand/comparePreAduit/index',
            meta: {
              title: '品牌评比预审',
              icon: '#'
            }
          },
          {
            name: 'Compare',
            path: 'compare',
            component: 'org/brand/compare/index',
            meta: {
              title: '品牌评比',
              icon: '#'
            }
          },
          {
            name: 'Exhibition',
            path: 'exhibition',
            component: 'org/brand/exhibition/index',
            meta: {
              title: '品牌展示',
              icon: '#'
            }
          },
          {
            name: 'CompareAduit',
            path: 'compareAduit',

            component: 'org/brand/compareAduit/index',
            meta: {
              title: '品牌评比审核',
              icon: '#'
            }
          },
          {
            name: 'Index1',
            path: 'index1',

            component: 'org/brand/exhibition/index1',
            meta: {
              title: '品牌展示管理',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'PartySchool',
        path: 'partySchool',
        component: 'public/content/index',
        meta: {
          title: '百联党校',
          icon: 'think_studyCentre'
        }
      },
      {
        name: 'Talent',
        path: 'talent',
        component: 'ParentView',
        meta: {
          title: '百联人才工程',
          icon: 'talent'
        },
        children: [
          {
            name: 'TalentPlan',
            path: 'TalentPlan',
            component: 'org/talent/talentPlanGrow/talentPlan',
            meta: {
              title: '人才规划',
              icon: '#'
            }
          },
          {
            name: 'TalentGrow',
            path: 'TalentGrow',
            component: 'org/talent/talentPlanGrow/talentGrow',
            meta: {
              title: '人才培养',
              icon: '#'
            }
          },
          {
            name: 'TalentReport',
            path: 'TalentReport',
            component: 'org/talent/talentReport/index',
            meta: {
              title: '一报告两评议',
              icon: '#'
            }
          },
          {
            name: 'ReportSum',
            path: 'reportSum',

            component: 'org/talent/talentReport/reportSum',
            meta: {
              title: '一报告两评议统计分析',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'OldLeader',
        path: 'oldLeader',
        component: 'public/content/index',
        meta: {
          title: '老干部工作',
          icon: 'org_member'
        }
      }
    ]
  },
  {
    path: '/discipline',
    redirect: '/discipline/index',
    meta: { more: true, title: '纪律', rank: 4 },
    component: Layout,
    children: [
      {
        name: 'Discipline',
        path: 'index',
        component: () => import('@/views/discipline/index.vue'),
        meta: {
          title: '组织建设',
          icon: ''
        }
      },
      {
        name: 'Index',
        path: 'index',

        component: 'discipline',
        meta: {
          title: '主界面',
          icon: '#'
        }
      },
      // {
      //   name: 'Honest',
      //   path: 'honest',
      //   component: 'ParentView',
      //   meta: {
      //     title: '廉情动态',
      //     icon: 'discipline_honest'
      //   },
      //   children: [
      //     {
      //       name: 'Discipline',
      //       path: 'discipline',
      //       component: 'public/content/index',
      //       meta: {
      //         title: '党纪宣贯',
      //         icon: '#'
      //       }
      //     },
      //     {
      //       name: 'TopicStudy',
      //       path: 'topicStudy',

      //       component: 'public/content/index',
      //       meta: {
      //         title: '专题学习',
      //         icon: '#'
      //       }
      //     },
      //     {
      //       name: 'Supervise',
      //       path: 'supervise',
      //       component: 'public/content/index',
      //       meta: {
      //         title: '监督检查',
      //         icon: '#'
      //       }
      //     }
      //   ]
      // },
      {
        name: 'ZeroBased',
        path: 'zeroBased',
        component: 'ParentView',
        meta: {
          title: '零基管理',
          icon: 'discipline_zeroBased'
        },
        children: [
          {
            name: 'EightProvisions',
            path: 'eightProvisions',
            component: 'public/content/index',
            query: '{"videotype": "1" }',
            meta: {
              title: '落实中央八项规定精神',
              icon: '#'
            }
          },
          {
            name: 'Governance',
            path: 'governance',
            component: 'public/content/index',
            meta: {
              title: '深化“四责协同”',
              icon: '#'
            }
          },
          {
            name: 'Leader',
            path: 'leader',

            component: 'public/content/index',
            meta: {
              title: '“一把手”和领导班子监督',
              icon: '#'
            }
          },
          {
            name: 'SevenReg',
            path: 'sevenReg',

            component: 'public/content/index',
            meta: {
              title: '七个不得',
              icon: '#'
            }
          },
          {
            name: 'RiskControl',
            path: 'riskControl',
            component: 'public/content/index',
            meta: {
              title: '廉政风险防控',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'SupervisionReform',
        path: 'supervisionReform',
        component: 'ParentView',
        meta: {
          title: '纪检监察体制改革',
          icon: 'build'
        },
        children: [
          {
            name: 'Communication',
            path: 'communication',
            component: 'public/partyContent/index',
            meta: {
              title: '业务资料',
              icon: '#'
            }
          },
          {
            name: 'WorkingSystem',
            path: 'workingSystem',

            component: 'public/partyContent/index',
            meta: {
              title: '工作制度',
              icon: '#'
            }
          },
          {
            name: 'TeamBuilding',
            path: 'teamBuilding',
            component: 'public/partyContent/index',
            meta: {
              title: '纪检监察队伍建设',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Cadre',
        path: 'cadre',
        component: 'ParentView',
        meta: {
          title: '干部联系基层',
          icon: 'org_member'
        },
        children: [
          {
            name: 'CadreTouchBase',
            path: 'cadreTouchBase',
            component: 'discipline/cadreTouchBase/index',
            meta: {
              title: '上传制度与清单',
              icon: '#'
            }
          },
          {
            name: 'CadreView',
            path: 'cadreView',
            component: 'discipline/cadreTouchBase/cadreView',
            meta: {
              title: '联系制度与清单',
              icon: '#'
            }
          },
          {
            name: 'BasicDynamic',
            path: 'basicDynamic',
            component: 'public/content/index',
            meta: {
              title: '联系基层动态',
              icon: ''
            }
          }
        ]
      }
    ]
  },
  {
    path: '/workGroup',
    redirect: '/workGroup/index',
    meta: { more: true, title: '工团', rank: 5 },
    component: Layout,
    children: [
      {
        name: 'WorkGroup',
        path: 'index',
        component: () => import('@/views/workGroup/index.vue'),
        meta: {
          title: '工团建设',
          icon: ''
        }
      },
      {
        name: 'ModelDetail',
        path: 'modelDetail',
        component: () => import('@/views/workGroup/pages/modelDetail.vue'),
        meta: {
          title: '劳模先进详情',
          icon: ''
        }
      },
      {
        name: 'WorkDetail',
        path: 'workDetail',
        component: () => import('@/views/workGroup/pages/workDetail.vue'),
        meta: {
          title: '工作室详情',
          icon: ''
        }
      },
      {
        name: 'detail',
        path: 'detail',
        component: () => import('@/views/workGroup/pages/detail.vue'),
        meta: {
          title: '立功竞赛详情',
          icon: ''
        }
      },
      {
        name: 'HeartDetail',
        path: 'heartDetail',
        component: () => import('@/views/workGroup/pages/heartDetail.vue'),
        meta: {
          title: '百暖连心详情',
          icon: ''
        }
      },
      {
        name: 'Index',
        path: 'index',

        component: 'workGroup',
        meta: {
          title: '主界面',
          icon: '#'
        }
      },
      {
        name: 'Merit_contest',
        path: 'merit_contest',
        component: 'ParentView',
        meta: {
          title: '立功竞赛',
          icon: 'think_advanced'
        },
        children: [
          {
            name: 'Labour',
            path: 'labour',
            component: 'ParentView',
            meta: {
              title: '劳动竞赛',
              icon: '#'
            },
            children: [
              {
                name: 'Achievement',
                path: 'achievement',
                component: 'public/content/index',
                meta: {
                  title: '成果展示',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'Innovation',
            path: 'innovation',

            component: 'ParentView',
            meta: {
              title: '创新创效',
              icon: '#'
            },
            children: [
              {
                name: 'Notice_publicity',
                path: 'notice_publicity',
                component: 'workGroup/meritContest/innovation/noticePublicity',
                meta: {
                  title: '通知公示',
                  icon: '#'
                }
              },
              {
                name: 'InnovateIndex',
                path: 'innovateIndex',
                component: 'workGroup/innovate/innovateIndex/index',
                meta: {
                  title: '设置评审标准',
                  icon: '#'
                }
              },
              {
                name: 'Material-declaration',
                path: 'material-declaration',
                component:
                  'workGroup/meritContest/innovation/materialDeclaration',
                meta: {
                  title: '评审材料申报',
                  icon: '#'
                }
              },
              {
                name: 'InnovateEvaIndexScore',
                path: 'innovateEvaIndexScore',
                component: 'workGroup/innovate/innovateEvaIndexScore/index',
                meta: {
                  title: '创新创效在线评审',
                  icon: '#'
                }
              },
              {
                name: 'ScoreView',
                path: 'scoreView',
                component: 'workGroup/innovate/innovateEvaIndexScore/scoreView',
                meta: {
                  title: '在线评审监督',
                  icon: '#'
                }
              }
            ]
          }
        ]
      },
      {
        name: 'ModelWorker',
        path: 'modelWorker',
        component: 'ParentView',
        meta: {
          title: '劳模先进',
          icon: 'workGroup_modelWorker'
        },
        children: [
          {
            name: 'OrdinaryCard',
            path: 'OrdinaryCard',
            component: 'workGroup/modelWorker/styleDisplay/OrdinaryCard/index',
            meta: {
              title: '劳模风采展示',
              icon: '#'
            }
          },
          {
            name: 'StyleDisplay',
            path: 'styleDisplay',
            component: 'workGroup/modelWorker/styleDisplay/index',
            meta: {
              title: '劳模风采管理',
              icon: '#'
            }
          },
          {
            name: 'ModelStudioCard',
            path: 'modelStudioCard',
            component:
              'workGroup/modelWorker/styleDisplay/ModelStudioCard/index',
            meta: {
              title: '劳模创新工作室',
              icon: '#'
            }
          },
          {
            name: 'AdvancedAppraise',
            path: 'advancedAppraise',

            component: 'workGroup/advancedAppraise/index',
            meta: {
              title: '综合评优',
              icon: '#'
            },
            children: [
              {
                name: 'AdvancedNotice',
                path: 'advancedNotice',
                component: 'public/content/index',
                meta: {
                  title: '综合评优通知',
                  icon: '#'
                }
              },
              {
                name: 'AdvancedAppraise',
                path: 'advancedAppraise',
                component: 'workGroup/advanced/advancedAppraise/index',
                meta: {
                  title: '综合评优申报',
                  icon: '#'
                }
              },
              {
                name: 'AppraiseCheck',
                path: 'appraiseCheck',
                component: 'workGroup/advanced/advancedAppraise/appraiseCheck',
                meta: {
                  title: '综合评优审核',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'Advanced',
            path: 'advanced',

            component: 'ParentView',
            meta: {
              title: '梯队建设',
              icon: '#'
            },
            children: [
              {
                name: 'AdvancedPersonal',
                path: 'advancedPersonal',
                component: 'workGroup/advanced/advancedPersonal/index',
                meta: {
                  title: '先进个人申报',
                  icon: '#'
                }
              },
              {
                name: 'CheckPersonal',
                path: 'checkPersonal',
                component: 'workGroup/advanced/advancedPersonal/checkPersonal',
                meta: {
                  title: '先进个人审批',
                  icon: '#'
                }
              },
              {
                name: 'AdvancedTeam',
                path: 'advancedTeam',
                component: 'workGroup/advanced/advancedTeam/index',
                meta: {
                  title: '先进集体申报',
                  icon: '#'
                }
              },
              {
                name: 'CheckTeam',
                path: 'checkTeam',
                component: 'workGroup/advanced/advancedTeam/checkTeam',
                meta: {
                  title: '先进集体审批',
                  icon: '#'
                }
              }
            ]
          }
        ]
      },
      {
        name: 'Democracy',
        path: 'democracy',
        component: 'ParentView',
        meta: {
          title: '民主管理',
          icon: 'workGroup_democracy'
        },
        children: [
          {
            name: 'StaffCongress/index',
            path: 'staffCongress/index',
            component: 'workGroup/democracy/staffCongress/index',
            meta: {
              title: '职工代表大会',
              icon: '#'
            }
          },
          {
            name: 'StaffCongress',
            path: 'staffCongress',

            component: 'workGroup/democracy/staffCongress/index1',
            meta: {
              title: '职工代表',
              icon: '#'
            }
          },
          {
            name: 'GhPatrol',
            path: 'ghPatrol',

            component: 'ParentView',
            meta: {
              title: '职工代表巡视',
              icon: '#'
            },
            children: [
              {
                name: 'GhPatrolWork',
                path: 'ghPatrolWork',
                component: 'workGroup/ghPatrol/ghPatrol/index',
                meta: {
                  title: '巡视反馈',
                  icon: '#'
                }
              },
              {
                name: 'GhPatrolView',
                path: 'ghPatrolView',
                component: 'workGroup/ghPatrol/ghPatrol/ghPatrolView',
                meta: {
                  title: '巡视工作查询',
                  icon: '#'
                }
              },
              {
                name: 'GhContrackWork',
                path: 'ghContrackWork',
                component: 'workGroup/ghPatrol/ghContract/index',
                meta: {
                  title: '集体合同填报',
                  icon: '#'
                }
              },
              {
                name: 'GhContractView',
                path: 'ghContractView',
                component: 'workGroup/ghPatrol/ghContract/ghContractView',
                meta: {
                  title: '集体合同监察',
                  icon: '#'
                }
              }
            ]
          }
        ]
      },
      {
        name: 'MemberCare',
        path: 'memberCare',
        component: 'ParentView',
        meta: {
          title: '员工关爱',
          icon: 'international'
        },
        children: [
          {
            name: 'Transformation',
            path: 'transformation',
            component: 'ParentView',
            meta: {
              title: '转型扶助',
              icon: '#'
            },
            children: [
              {
                name: 'AssistApply',
                path: 'assistApply',
                component:
                  'workGroup/memberCare/transformation/assistApply/index',
                meta: {
                  title: '扶助申请',
                  icon: '#'
                }
              },
              {
                name: 'AssistCheck',
                path: 'assistCheck',
                component:
                  'workGroup/memberCare/transformation/assistCheck/index',
                meta: {
                  title: '扶助审核',
                  icon: '#'
                }
              },
              {
                name: 'AssistSum',
                path: 'assistSum',
                component:
                  'workGroup/memberCare/transformation/assistSum/index',
                meta: {
                  title: '扶助统计',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'DifficultyHelp',
            path: 'difficultyHelp',
            component: 'ParentView',
            meta: {
              title: '困难职工扶助管理',
              icon: '#'
            },
            children: [
              {
                name: 'HelpCountApply',
                path: 'helpCountApply',

                component: 'workGroup/difficultyHelpCount/index',
                meta: {
                  title: '基层上报统计',
                  icon: '#'
                }
              },
              {
                name: 'HelpApply',
                path: 'helpApply',

                component:
                  'workGroup/memberCare/difficultyHelp/helpApply/index',
                meta: {
                  title: '困难帮扶申请',
                  icon: '#'
                }
              },
              {
                name: 'HelpCheck',
                path: 'helpCheck',

                component:
                  'workGroup/memberCare/difficultyHelp/helpCheck/index',
                meta: {
                  title: '困难帮扶审核',
                  icon: '#'
                }
              },
              {
                name: 'ArchivesChange',
                path: 'archivesChange',

                component:
                  'workGroup/memberCare/difficultyHelp/archivesChange/index',
                meta: {
                  title: '帮扶档案变更',
                  icon: '#'
                }
              },
              {
                name: 'ArchivesCheck',
                path: 'archivesCheck',

                component:
                  'workGroup/memberCare/difficultyHelp/archivesCheck/index',
                meta: {
                  title: '档案变更审核',
                  icon: '#'
                }
              },
              {
                name: 'CondolenceResult',
                path: 'condolenceResult',
                component: 'public/content/index',
                meta: {
                  title: '慰问成果',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'HotCare',
            path: 'hotCare',
            component: 'ParentView',
            meta: {
              title: '高温慰问',
              icon: '#'
            },
            children: [
              {
                name: 'HotApply',
                path: 'hotApply',

                component: 'workGroup/memberCare/hotCare/hotApply/index',
                meta: {
                  title: '基层申报',
                  icon: '#'
                }
              },
              {
                name: 'HotCheck',
                path: 'hotCheck',

                component: 'workGroup/memberCare/hotCare/hotCheck/index',
                meta: {
                  title: '慰问审核',
                  icon: '#'
                }
              },
              {
                name: 'HotSum',
                path: 'hotSum',

                component: 'workGroup/memberCare/hotCare/hotSum/index',
                meta: {
                  title: '慰问汇总',
                  icon: '#'
                }
              },
              {
                name: 'HotResult',
                path: 'hotResult',
                component: 'public/content/index',
                meta: {
                  title: '慰问成果',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'FinaPatrol',
            path: 'finaPatrol',

            component: 'ParentView',
            meta: {
              title: '财务经审管理',
              icon: '#'
            },
            children: [
              {
                name: 'FinaPatrolMainGroup',
                path: 'finaPatrolMainGroup',
                component:
                  'workGroup/memberCare/finaPatrol/finaPatrolMain/indexGroup',
                meta: {
                  title: '经审反馈意见（集团）',
                  icon: '#'
                }
              },
              {
                name: 'FinaPatrolMain',
                path: 'finaPatrolMain',
                component:
                  'workGroup/memberCare/finaPatrol/finaPatrolMain/index',
                meta: {
                  title: '报送整改报告（基层）',
                  icon: '#'
                }
              },
              {
                name: 'FinaPatrolAudit',
                path: 'finaPatrolAudit',
                component:
                  'workGroup/memberCare/finaPatrol/finaPatrolAudit/index',
                meta: {
                  title: '整改报告审核',
                  icon: '#'
                }
              },
              {
                name: 'FinaPatrolView',
                path: 'finaPatrolView',
                component:
                  'workGroup/memberCare/finaPatrol/finaPatrolView/index',
                meta: {
                  title: '查看整改报告（基层）',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'CareHeart',
            path: 'careHeart',
            component: 'ParentView',
            meta: {
              title: '百暖连心',
              icon: '#'
            },
            children: [
              {
                name: 'CareHeartDemand',
                path: 'CareHeartDemand',
                component:
                  'workGroup/memberCare/careHeart/careHeartDemand/index',
                meta: {
                  title: '职工需求与意愿',
                  icon: '#'
                }
              },
              {
                name: 'CareHeartDemandGroup',
                path: 'CareHeartDemandGroup',
                component:
                  'workGroup/memberCare/careHeart/careHeartDemand/indexGroup',
                meta: {
                  title: '职工需求与意愿（集团）',
                  icon: '#'
                }
              },
              {
                name: 'CareHeartProject',
                path: 'careHeartProject',
                component:
                  'workGroup/memberCare/careHeart/careHeartProject/index',
                meta: {
                  title: '优秀实事项目',
                  icon: '#'
                }
              },
              {
                name: 'CareHeartProjectGroup',
                path: 'careHeartProjectGroup',
                component:
                  'workGroup/memberCare/careHeart/careHeartProject/indexGroup',
                meta: {
                  title: '优秀实事项目（集团）',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'FemaleEmploy',
            path: 'femaleEmploy',

            component: 'public/content/index',
            meta: {
              title: '女工关爱',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'GhBuild',
        path: 'ghBuild',
        component: 'ParentView',
        meta: {
          title: '工会建设',
          icon: 'workGroup_ghBuild'
        },
        children: [
          {
            name: 'GhOrg',
            path: 'ghOrg',
            component: 'workGroup/ghBuild/ghOrg',
            meta: {
              title: '工会组织建设',
              icon: '#'
            }
          },
          {
            name: 'CommonFile',
            path: 'commonFile',
            component: 'public/content/index',
            meta: {
              title: '常用文件表格',
              icon: '#'
            }
          }
        ]
      },
      {
        name: 'Youth',
        path: 'youth',
        component: 'ParentView',
        meta: {
          title: '青春建功',
          icon: 'workGroup_youth'
        },
        children: [
          {
            name: 'YouthIdea',
            path: 'youthIdea',
            component: 'public/content/index',
            meta: {
              title: '青年思想引领',
              icon: '#'
            }
          },
          {
            name: 'GoverningGroup',
            path: 'governingGroup',
            component: 'ParentView',
            meta: {
              title: '全面从严治团',
              icon: '#'
            },
            children: [
              {
                name: 'TwOrg',
                path: 'twOrg',
                component: 'workGroup/youth/twOrg',
                meta: {
                  title: '团组织建设',
                  icon: '#'
                }
              },
              {
                name: 'Standard',
                path: 'standard',
                component: 'public/content/index',
                meta: {
                  title: '制度流程规范',
                  icon: '#'
                }
              }
            ]
          },
          {
            name: 'YouthPost',
            path: 'youthPost',
            component: 'public/content/index',
            meta: {
              title: '青年岗位建功',
              icon: '#'
            }
          },
          {
            name: 'YouthTalent',
            path: 'youthTalent',
            component: 'public/content/index',
            meta: {
              title: '服务青年成才',
              icon: '#'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/culture',
    redirect: '/culture/index',
    meta: { more: true, title: '文化', rank: 6 },
    component: Layout,
    children: [
      {
        name: 'Culture',
        path: 'index',
        component: () => import('@/views/culture/index.vue'),
        meta: {
          title: '文化建设',
          icon: ''
        }
      },
      {
        name: 'UploadMaterials',
        path: 'uploadMaterials',
        component: () => import('@/views/culture/media/upload.vue'),
        meta: {
          title: '上传素材',
          icon: '#'
        }
      },

      {
        name: 'SocialDetail',
        path: '/social/detail',
        component: () => import('@/views/culture/social/detail.vue'),
        meta: {
          title: '社会责任详情',
          icon: '#'
        }
      },
      {
        name: 'MediaDetail',
        path: 'mediaDetail/:uid',
        component: () => import('@/views/culture/media/detail.vue'),
        meta: {
          title: '详情',
          icon: '#'
        }
      }
    ]
  }
  // {
  //   path: '/media',
  //   redirect: '/media/list',
  //   component: Layout,
  //   meta: {
  //     auth: 'multimedia:media:dir',
  //     icon: 'ph:video-fill',
  //     title: '素材资源',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/media/list',
  //       name: 'MediaList',
  //       component: () => import('@/views/media/list/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:media:public',
  //         title: '素材列表',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/list/detail/:id',
  //       name: 'MediaListDetail',
  //       component: () => import('@/views/media/list/detail.vue'),
  //       meta: {
  //         title: '素材列表-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/upload',
  //       name: 'MediaUpload',
  //       component: () => import('@/views/media/upload/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:media:list',
  //         title: '素材上传',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/upload/detail/:id',
  //       name: 'MediaUploadDetail',
  //       component: () => import('@/views/media/upload/detail.vue'),
  //       meta: {
  //         title: '素材上传-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/upload/create/:mediaType',
  //       name: 'MediaUploadCreate',
  //       component: () => import('@/views/media/upload/create.vue'),
  //       meta: {
  //         title: '素材上传-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/upload/update/:id',
  //       name: 'MediaUploadUpdate',
  //       component: () => import('@/views/media/upload/update.vue'),
  //       meta: {
  //         title: '素材上传-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/review',
  //       name: 'MediaReview',
  //       component: () => import('@/views/media/review/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:media:audit',
  //         title: '素材审核',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/review/detail/:id',
  //       name: 'MediaReviewDetail',
  //       component: () => import('@/views/media/review/detail.vue'),
  //       meta: {
  //         title: '素材审核-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/review/update/:id',
  //       name: 'MediaReviewUpdate',
  //       component: () => import('@/views/media/review/update.vue'),
  //       meta: {
  //         title: '素材审核-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/review/media-clip',
  //       name: 'MediaClip',
  //       component: () => import('@/views/media/review/mediaClip.vue'),
  //       meta: {
  //         title: '视频裁剪',
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/collect',
  //       name: 'MediaCollect',
  //       component: () => import('@/views/media/collect/upload.vue'),
  //       meta: {
  //         title: '个人收藏',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/collect/detail/:id',
  //       name: 'MediaCollectDetail',
  //       component: () => import('@/views/media/collect/detail.vue'),
  //       meta: {
  //         title: '个人收藏-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/mediaActivitiesScore',
  //       name: 'MediaActivitiesScore',
  //       component: () => import('@/views/media/activitiesscore/upload.vue'),
  //       meta: {
  //         title: '活动评分',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/mediaActivitiesScore/detail/:id/:activitiesId',
  //       name: 'MediaActivitiesScoreDetail',
  //       component: () => import('@/views/media/activitiesscore/detail.vue'),
  //       meta: {
  //         title: '活动评分详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/mediaActivitiesScore/update/:id/:activitiesId',
  //       name: 'MediaActivitiesScoreUpdate',
  //       component: () => import('@/views/media/activitiesscore/update.vue'),
  //       meta: {
  //         title: '活动打分',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/mediaActivities',
  //       name: 'mediaActivities',
  //       component: () => import('@/views/media/activitieShow/upload.vue'),
  //       meta: {
  //         title: '活动展示',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/media/mediaActivities/detail/:id/:activitiesId',
  //       name: 'mediaActivitiesDetail',
  //       component: () => import('@/views/media/activitieShow/detail.vue'),
  //       meta: {
  //         title: '活动展示详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/media/mediaEventsShowcase',
  //       name: 'mediaEventsShowcase',
  //       component: () => import('@/views/media/activitiespublic/upload.vue'),
  //       meta: {
  //         title: '活动排名',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/propaganda',
  //   redirect: '/propaganda/filing',
  //   component: Layout,
  //   meta: {
  //     auth: 'multimedia:propaganda:dir',
  //     icon: 'material-symbols:reviews',
  //     title: '宣传考核',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/propaganda/clue-filing',
  //       name: 'PropagandaClueFiling',
  //       component: () => import('@/views/propaganda/clueFiling/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:propagandaClue:query',
  //         title: '新闻线索申报',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval-clue',
  //       name: 'PropagandaClueApproval',
  //       component: () => import('@/views/propaganda/approvalClue/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:propagandaClue:audit',
  //         title: '新闻线索审核',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/propaganda/clue-filing/create',
  //       name: 'PropagandaClueFillingCreate',
  //       component: () => import('@/views/propaganda/clueFiling/create.vue'),
  //       meta: {
  //         title: '新闻线索-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/clue-filing/detail/:id',
  //       name: 'PropagandaClueFillingDetail',
  //       component: () => import('@/views/propaganda/clueFiling/detail.vue'),
  //       meta: {
  //         title: '新闻线索-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/clue-filing/update/:id',
  //       name: 'PropagandaClueFillingUpdate',
  //       component: () => import('@/views/propaganda/clueFiling/update.vue'),
  //       meta: {
  //         title: '新闻线索修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval-clue/audit/:id',
  //       name: 'PropagandaClueFillingAudit',
  //       component: () => import('@/views/propaganda/approvalClue/audit.vue'),
  //       meta: {
  //         title: '新闻线索审核',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/filing',
  //       name: 'PropagandaFilling',
  //       component: () => import('@/views/propaganda/filing/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:propaganda:list',
  //         title: '媒体报送',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/propaganda/filing/appeal/:id/:orgCode',
  //       name: 'PropagandFilingAppeal',
  //       component: () => import('@/views/propaganda/filing/appeal.vue'),
  //       meta: {
  //         title: '媒体报送-申诉',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/filing/create',
  //       name: 'PropagandaFillingCreate',
  //       component: () => import('@/views/propaganda/filing/create.vue'),
  //       meta: {
  //         title: '媒体报送-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/filing/update/:id/:status',
  //       name: 'PropagandaFillingUpdate',
  //       component: () => import('@/views/propaganda/filing/update.vue'),
  //       meta: {
  //         title: '媒体报送-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval',
  //       name: 'PropagandaApproval',
  //       component: () => import('@/views/propaganda/approval/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:propagandaAudit:list',
  //         title: '媒体审核',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval/create/:id/:type',
  //       name: 'PropagandaApprovalCreate',
  //       component: () => import('@/views/propaganda/approval/create.vue'),
  //       meta: {
  //         title: '媒体审核-提交集团',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval/audit/:id/:type',
  //       name: 'PropagandaApprovalAudit',
  //       component: () => import('@/views/propaganda/approval/audit.vue'),
  //       meta: {
  //         title: '媒体审核-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/propaganda/approval-new',
  //       name: 'PropagandaApprovalNew',
  //       component: () => import('@/views/propaganda/approvalNew/upload.vue'),
  //       meta: {
  //         auth: 'multimedia:propagandaAuditNew:list',
  //         title: '新媒体审核',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/propaganda/filing/detail/:id',
  //       name: 'PropagandaFillingDetail',
  //       component: () => import('@/views/propaganda/filing/detail.vue'),
  //       meta: {
  //         title: '新媒体审核-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/task',
  //   redirect: '/task/release',
  //   component: Layout,
  //   meta: {
  //     auth: 'work:workMain:dir',
  //     icon: 'icon-park-solid:schedule',
  //     title: '日程任务',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/task/release',
  //       name: 'TaskRelease',
  //       component: () => import('@/views/task/release/upload.vue'),
  //       meta: {
  //         auth: 'work:workMain:list',
  //         title: '日程任务发布',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/task/release/detail/:id',
  //       name: 'TaskReleaseDetail',
  //       component: () => import('@/views/task/release/detail.vue'),
  //       meta: {
  //         title: '日程任务发布-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/release/create',
  //       name: 'TaskReleaseCreate',
  //       component: () => import('@/views/task/release/create.vue'),
  //       meta: {
  //         title: '日程任务发布-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/release/supervision/:id',
  //       name: 'taskReleaseSupervision',
  //       component: () => import('@/views/task/release/supervision.vue'),
  //       meta: {
  //         title: '日程任务发布-督查',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/release/update/:id',
  //       name: 'TaskReleaseUpdate',
  //       component: () => import('@/views/task/release/update.vue'),
  //       meta: {
  //         title: '日程任务发布-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/execution',
  //       name: 'TaskExecution',
  //       component: () => import('@/views/task/execution/upload.vue'),
  //       meta: {
  //         auth: 'work:workFeedback:list',
  //         title: '日程任务执行',
  //         keepAlive: true,
  //         visible: true,
  //       },
  //     },
  //     {
  //       path: '/task/execution/update/:id/:type',
  //       name: 'TaskExecutionUpdate',
  //       component: () => import('@/views/task/execution/update.vue'),
  //       meta: {
  //         title: '日程任务执行-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/execution/create/:id/:status',
  //       name: 'TaskExecutionCreate',
  //       component: () => import('@/views/task/execution/create.vue'),
  //       meta: {
  //         title: '跳转素材-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/task/execution/detail/:id/:workId',
  //       name: 'TaskExecutionDetail',
  //       component: () => import('@/views/task/execution/detail.vue'),
  //       meta: {
  //         title: '跳转素材-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/public',
  //   redirect: '/public/resource',
  //   component: Layout,
  //   meta: {
  //     auth: 'publicresource:publicResourceFile:list',
  //     icon: 'mdi:resource-description-framework',
  //     title: '公共资源',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/public/resource',
  //       name: 'PublicResource',
  //       component: () => import('@/views/resource/upload.vue'),
  //       meta: {
  //         auth: 'publicresource:publicResourceFile:list',
  //         title: '公共资源',
  //         keepAlive: true,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/public/resource/detail/:id',
  //       name: 'PublicResourceDetail',
  //       component: () => import('@/views/resource/detail.vue'),
  //       meta: {
  //         title: '公共资源-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/public/resource/create',
  //       name: 'PublicResourceCreate',
  //       component: () => import('@/views/resource/create.vue'),
  //       meta: {
  //         title: '公共资源-新增',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/public/resource/update/:id',
  //       name: 'PublicResourceUpdate',
  //       component: () => import('@/views/resource/update.vue'),
  //       meta: {
  //         title: '公共资源-修改',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/msg',
  //   component: Layout,
  //   redirect: '/msg/message',
  //   meta: {
  //     icon: 'icon-park-solid:message',
  //     title: '消息待办',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/msg/message',
  //       name: 'Message',
  //       component: () => import('@/views/message/upload.vue'),
  //       meta: {
  //         title: '消息待办',
  //         keepAlive: true,
  //         visible: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/notice',
  //   component: Layout,
  //   redirect: '/notice/announcement',
  //   meta: {
  //     auth: 'system:notice:list',
  //     icon: 'icon-park-solid:announcement',
  //     title: '公告通知',
  //     visible: true,
  //   },
  //   children: [
  //     {
  //       path: '/notice/announcement',
  //       name: 'Notice',
  //       component: () => import('@/views/notice/upload.vue'),
  //       meta: {
  //         auth: 'system:notice:list',
  //         title: '公告通知',
  //         keepAlive: true,
  //         visible: false,
  //       },
  //     },
  //     {
  //       path: '/notice/announcement/detail/:noticeId',
  //       name: 'NoticeDetail',
  //       component: () => import('@/views/notice/detail.vue'),
  //       meta: {
  //         title: '公告通知-详情',
  //         keepAlive: false,
  //         visible: false,
  //       },
  //     },
  //   ],
  // },
];
