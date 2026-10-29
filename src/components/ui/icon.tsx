import { Box, Cpu, Droplet, Phone, Thermometer, Users, Wrench, Zap } from 'lucide-react';
import type { IconName } from '../../content/page';

const map = {
  zap: Zap,
  cpu: Cpu,
  wrench: Wrench,
  box: Box,
  users: Users,
  thermo: Thermometer,
  drop: Droplet,
  phone: Phone,
} as const satisfies Record<IconName, unknown>;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = map[name];
  return <C aria-hidden="true" className={className} strokeWidth={1.75} />;
}
