import { ProviderType, ProviderConfigs } from '../types/config';
import Browser from 'webextension-polyfill';

export async function saveProviderConfigs(
  provider: ProviderType,
  configs: ProviderConfigs['configs'],
) {
  console.log(provider, 'provider', configs, 'configs');

  return Browser.storage.local.set({
    provider,
    [`provider:${ProviderType.GPT3}`]: configs[ProviderType.GPT3],
  });
}
export async function getProviderConfigs(): Promise<ProviderConfigs> {
  const { provider = ProviderType.ChatGPT } = await Browser.storage.local.get('provider');
  const configKey = `provider:${ProviderType.GPT3}`;
  const result = await Browser.storage.local.get(configKey);
  return {
    provider,
    configs: {
      [ProviderType.GPT3]: result[configKey],
    },
  };
}
