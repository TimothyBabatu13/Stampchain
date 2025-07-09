type StatRow = {
    month: string;
    total_tokens_distributed: number;
    active_users: number;
  };
  
  type MonthlyChange = {
    month: string;
    total_tokens_distributed: number;
    active_users: number;
    token_change: number;
    token_direction: "increase" | "decrease" | "no change";
    user_change: number;
    user_direction: "increase" | "decrease" | "no change";
  };
  
  export const calculateActiveUsersMonthlyChange = (data: StatRow[]): MonthlyChange[] => {
    if (!data.length) return [];
  
    return data.map((current, index) => {
      if (index === 0) {
        return {
          ...current,
          token_change: current.total_tokens_distributed,
          token_direction: "increase",
          user_change: current.active_users,
          user_direction: "increase"
        };
      }
  
      const prev = data[index - 1];
  
      const tokenDiff = current.total_tokens_distributed - prev.total_tokens_distributed;
      const tokenChange = prev.total_tokens_distributed === 0
        ? current.total_tokens_distributed
        : (tokenDiff / prev.total_tokens_distributed) * 100;
  
      const userDiff = current.active_users - prev.active_users;
      const userChange = prev.active_users === 0
        ? current.active_users
        : (userDiff / prev.active_users) * 100;
  
      return {
        ...current,
        token_change: Number(tokenChange.toFixed(2)),
        token_direction: tokenChange > 0 ? "increase" : tokenChange < 0 ? "decrease" : "no change",
        user_change: Number(userChange.toFixed(2)),
        user_direction: userChange > 0 ? "increase" : userChange < 0 ? "decrease" : "no change"
      };
    });
  };
  

  type CampaignStat = {
    month: string;
    total_tokens_distributed: number;
  };

  export const calculateMonthlyChange = (data: CampaignStat[]) => {
    if(!data.length) return [];
    return data.map((current, index) => {
      if (index === 0) {
        return { ...current, change: current.total_tokens_distributed, direction: "increase" };
      }
  
      const prev = data[index - 1];
      const difference = current.total_tokens_distributed - prev.total_tokens_distributed;
      const change = (difference / prev.total_tokens_distributed) * 100;
  
      return {
        ...current,
        change: Number(change.toFixed(2)),
        direction: change > 0 ? "increase" : change < 0 ? "decrease" : "no change"
      };
    });
  }



  type TokenClaimStat = {
    month: string;
    active_users: number;
  };
  
  
  
  export const calculateTokensDistributedChange = (data: TokenClaimStat[]) => {

    if (!data.length) {
      return []
    }
  
    return data.map((current, index) => {
      if (index === 0) {
        return { ...current, change: current.active_users, direction: "increase" };
      }
  
      const prev = data[index - 1];
      const diff = current.active_users - prev.active_users;
      const change = prev.active_users === 0
        ? 100
        : (diff / prev.active_users) * 100;
  
      return {
        ...current,
        change: Number(change.toFixed(2)),
        direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change'
      };
    });
  };


  type QRScanStat = {
    month: string;              
    successful_scans: number;   
  };
  
  type QRScanChange = QRScanStat & {
    change: number;             // e.g. 12.5
    direction: 'increase' | 'decrease' | 'no change';
  };
  

  export const calculateQrScanChange = (data: QRScanStat[]): QRScanChange[] => {
    if (!Array.isArray(data) || data.length === 0) {
      return [{
        month: new Date().toISOString().slice(0, 7),
        successful_scans: 0,
        change: 0,
        direction: 'no change'
      }];
    }
  
    return data.map((current, index) => {
      if (index === 0) {
        return {
          ...current,
          change: current.successful_scans, // or 0
          direction: 'increase',
        };
      }
  
      const prev = data[index - 1];
      const difference = current.successful_scans - prev.successful_scans;
  
      const change = prev.successful_scans === 0
        ? current.successful_scans // 100% increase from 0 → X
        : (difference / prev.successful_scans) * 100;
  
      return {
        ...current,
        change: Number(change.toFixed(2)),
        direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change',
      };
    });
  };
  