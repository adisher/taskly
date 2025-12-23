import React from 'react';
import { router } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';
import { Task, TaskStage } from '@/types';

interface Props {
    task: Task;
    stages: TaskStage[];
    variant?: 'select' | 'badge';
}

export default function TaskStageChanger({ task, stages, variant = 'select' }: Props) {
    // Check if task has blocking dependencies
    const hasBlockingDependencies = task.depends_on_tasks && task.depends_on_tasks.length > 0 &&
        task.depends_on_tasks.some((dep: Task) => dep.progress < 100);

    const blockingDependenciesCount = task.depends_on_tasks?.filter((dep: Task) => dep.progress < 100).length || 0;

    const handleStageChange = (stageId: string) => {
        // Don't allow stage change if there are blocking dependencies
        if (hasBlockingDependencies) {
            return;
        }

        router.put(route('tasks.change-stage', task.id), {
            task_stage_id: stageId
        });
    };

    const currentStage = stages.find(s => s.id === task.task_stage_id);

    if (variant === 'badge') {
        return (
            <Badge
                variant="outline"
                style={{
                    backgroundColor: currentStage?.color + '20',
                    borderColor: currentStage?.color,
                    color: currentStage?.color
                }}
            >
                {currentStage?.name}
            </Badge>
        );
    }

    // If there are blocking dependencies, show disabled select with tooltip
    if (hasBlockingDependencies) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="relative">
                        <Select value={task.task_stage_id.toString()} disabled>
                            <SelectTrigger className="opacity-60 cursor-not-allowed">
                                <SelectValue />
                            </SelectTrigger>
                        </Select>
                        <AlertCircle className="h-4 w-4 text-amber-600 absolute right-8 top-1/2 -translate-y-1/2" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-medium">Cannot change status</p>
                    <p className="text-xs">{blockingDependenciesCount} incomplete {blockingDependenciesCount === 1 ? 'dependency' : 'dependencies'}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Select value={task.task_stage_id.toString()} onValueChange={handleStageChange}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id.toString()}>
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: stage.color }}
                            />
                            <span>{stage.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}